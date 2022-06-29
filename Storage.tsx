import AsyncStorage from "@react-native-async-storage/async-storage";

import { globalState } from "./Store";

export const saveFavourites = () => {
    AsyncStorage.setItem("@favourites", JSON.stringify(globalState.favouritedMedia.get()))
        .then(() => {
            console.log("Favourites saved!");
        })
        .catch((error) => console.error(error));
};

export const loadFavourites = () => {
    AsyncStorage.getItem("@favourites")
        .then((favourites) => {
            if (favourites !== null) {
                globalState.favouritedMedia.set((previousData) => {
                    return JSON.parse(favourites);
                });
                console.log("Favourites found on file! Loaded into state.");
            } else {
                console.log("No favourites found! Reverting to default.");
            }
        })
        .catch((error) => console.error(error));
};
