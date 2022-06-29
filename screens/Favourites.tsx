import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import MediaFlatList from "../components/MediaFlatList";
import { globalState } from "../Store";
import { useState } from "@hookstate/core";

const Favourites = () => {
    const state = useState(globalState);
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <MediaFlatList data={state.favouritedMedia.get()} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "white",
    },
});

export default Favourites;
