import {
    Image,
    StyleSheet,
    Platform,
    Dimensions,
    SafeAreaView,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const cloudinary_cloud_name = "ds83j91lr";
const cloudinary_base_url = "https://res.cloudinary.com";
const cloudinary_names = [
    "samples/animals/cat",
    "giftcards/zqyd0ngnipltgeiamaai",
    "samples/animals/three-dogs",
].map(
    (image) =>
        `${cloudinary_base_url}/${cloudinary_cloud_name}/image/upload/${image}`
);
// <CloudinarySVG style={styles.reactLogo} />}

export default function HomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ParallaxScrollView
                headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
                headerImage={
                    <MaterialIcons
                        size={310}
                        color="#FFFFFF"
                        name="cloud"
                        style={styles.headerImage}
                    />
                }
            >
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">CLOUDINARY</ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    {cloudinary_names.map((image) => (
                        <Image
                            key={image}
                            style={styles.image}
                            source={{ uri: image }}
                            resizeMode="contain"
                        />
                    ))}
                </ThemedView>
            </ParallaxScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    stepContainer: {
        flex: 1,
        gap: 8,
        marginBottom: 8,
    },
    headerImage: {
        color: "#FFFFFF",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    reactLogo: {
        height: 178,
        width: 290,
        top: 0,
        left: -25,
        position: "absolute",
    },
    image: {
        // width: 300,
        height: 350,
    },
});
