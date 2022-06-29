import { useState } from "@hookstate/core";
import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { globalState } from "../Store";
import { saveFavourites } from "../Storage";

const MediaFlatList = (props) => {
    const state = useState(globalState);

    const keyExtractor = (item: any, index: number) => index.toString();

    const handleFavourite = (item: any) => {
        if (state.favouritedMedia.get().filter((e) => e.imdbID === item.imdbID).length > 0) {
            state.favouritedMedia.set((previousState) => {
                return previousState.filter((e) => e.imdbID !== item.imdbID);
            });
        } else {
            state.favouritedMedia.set((previousState) => {
                return [JSON.parse(JSON.stringify(item)), ...previousState]; // Gotta clone before adding to avoid sending the reference.
            });
        }
        saveFavourites();
    };

    const renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <Avatar
                source={{
                    uri: item.Poster !== undefined ? item.Poster : "https://www.iconsdb.com/icons/preview/gray/documentary-xxl.png",
                }}
            />
            <ListItem.Content>
                <ListItem.Title>{item.Title}</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitle}>{item.Year}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron
                onPress={() => {
                    handleFavourite(item);
                }}
                name={state.favouritedMedia.get().filter((e) => e.imdbID === item.imdbID).length > 0 ? "star" : "star-outline"}
                size={25}
                color="tomato"
            />
        </ListItem>
    );

    return (
        <FlatList
            onEndReached={() => {
                if (typeof props.endReachedCallback === "function") {
                    props.endReachedCallback();
                }
            }}
            onEndReachedThreshold={0.3}
            keyExtractor={keyExtractor}
            data={props.data}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    subtitle: {
        color: "#AAA",
    },
    listItem: {
        fontSize: 16,
        color: "black",
    },
});

export default MediaFlatList;
