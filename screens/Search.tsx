import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import MediaSearchBar from "../components/MediaSearchBar";
import MediaTypeSelector from "../components/MediaTypeSelector";
import MediaFlatList from "../components/MediaFlatList";
import { globalState } from "../Store";
import { useState } from "@hookstate/core";
import { API_KEY } from "../Constants";

const Search = () => {
    const state = useState(globalState);

    const clearSearch = () => {
        state.currentResults.set((previousState) => {
            return [];
        });
        state.currentPage.set(1);
        state.atEnd.set(false);
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <MediaSearchBar
                onClear={() => {
                    clearSearch();
                }}
                searchCallback={() => {
                    const searchTerm = state.search.get().trim();
                    const mediaTypeIndex = state.mediaTypeIndex.get();

                    if (searchTerm.length > 3) {
                        const queryUrl = `https://www.omdbapi.com/?s=${searchTerm}&type=${mediaTypeIndex == 0 ? "movie" : "series"}&apikey=${API_KEY}&page=${state.currentPage.get()}`;

                        fetch(queryUrl).then((response) => {
                            response.json().then((json) => {
                                state.currentResults.set((previousState) => {
                                    return json["Search"];
                                });
                            });
                        });
                    }
                }}
            />
            <MediaTypeSelector
                onPress={() => {
                    clearSearch();
                }}
            />
            <MediaFlatList
                endReachedCallback={() => {
                    console.log(`Loading next page... ${state.currentPage.get()}`);
                    if (!state.loadingData.get() && !state.atEnd.get()) {
                        state.currentPage.set(state.currentPage.get() + 1);
                        state.loadingData.set(true);

                        const searchTerm = state.search.get().trim();
                        const mediaTypeIndex = state.mediaTypeIndex.get();

                        const queryUrl = `https://www.omdbapi.com/?s=${searchTerm}&type=${mediaTypeIndex == 0 ? "movie" : "series"}&apikey=${API_KEY}&page=${state.currentPage.get()}`;

                        fetch(queryUrl).then((response) => {
                            response.json().then((json) => {
                                if (json["Error"]) {
                                    state.atEnd.set(true);
                                    state.loadingData.set(false);
                                    return;
                                }

                                state.currentResults.set((previousState) => {
                                    return previousState.concat(json["Search"]);
                                });
                                state.loadingData.set(false);
                            });
                        });
                    }
                }}
                data={state.currentResults.get()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "white",
    },
});

export default Search;
