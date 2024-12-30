import { StyleSheet, Pressable, Image } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getErrorMessage } from "@/utils/funckage";
import Toast from "react-native-toast-message";
import axios from "axios";

export default function CloudinaryScreen() {
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(
        null
    );
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState<string>("");

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "livePhotos", "videos"],
            allowsEditing: true,
            // allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const handleError = (error: any) => {
        console.log({ error });

        const message = getErrorMessage(error);
        Toast.show({
            type: "success",
            text1: message,
            visibilityTime: 2000,
        });
    };

    const upload_image = async () => {
        try {
            setLoading(true);
            console.log({ image });

            if (!image || !image.type || !image.uri) {
                return;
            }

            const imageFile = {
                name: image?.fileName || `image_${Date.now()}`,
                type: image.type,
                uri: image.uri,
                mimeType: image?.mimeType,
            };
            const FORMDATA = new FormData();
            FORMDATA.append("file", imageFile as any);

            const response = await axios.post(
                "http://localhost:4030/cloudinary",
                FORMDATA,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const { message, data, success } = response.data;
            if (success) {
                setUrl(data.secure_url);
                Toast.show({
                    type: "success",
                    text1: message,
                    visibilityTime: 2000,
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: message,
                    visibilityTime: 2000,
                });
            }
        } catch (error: any) {
            if (error?.response?.data) {
                handleError(error?.response?.data);
            } else {
                handleError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="chevron.left.forwardslash.chevron.right"
                    style={styles.headerImage}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                {image?.uri ? (
                    <Image
                        source={{ uri: image.uri }}
                        style={styles.cloudinaryImage}
                    />
                ) : (
                    <Image
                        source={require("@/assets/images/cloudinary.png")}
                        style={styles.cloudinaryImage}
                    />
                )}
            </ThemedView>

            {image?.uri ? (
                <ThemedView style={styles.buttons}>
                    <Pressable disabled={loading} onPress={upload_image}>
                        <ThemedText>Upload</ThemedText>
                    </Pressable>
                    <Pressable
                        disabled={!image || loading}
                        onPress={() => setImage(null)}
                    >
                        <ThemedText>Cancel</ThemedText>
                    </Pressable>
                </ThemedView>
            ) : (
                <ThemedView style={styles.buttons}>
                    <Pressable onPress={pickImage}>
                        <ThemedText>Select Image</ThemedText>
                    </Pressable>
                </ThemedView>
            )}
            <Collapsible title="Cloud">
                <ThemedText>
                    For static images, you can use the{" "}
                    <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
                    <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes
                    to provide files for different screen densities
                </ThemedText>
                <Image
                    source={require("@/assets/images/react-logo.png")}
                    style={{ alignSelf: "center" }}
                />
            </Collapsible>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },

    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cloudinaryImage: {
        height: 230,
        width: "100%",
    },
    titleContainer: {
        borderColor: "#38FE88",
        borderStyle: "solid",
        flex: 1,
        flexDirection: "row",
        gap: 8,
    },
});
