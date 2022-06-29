import { createState, useState, State } from "@hookstate/core";

export const globalState = createState({
    mediaTypeIndex: 0,
    search: "",
    currentResults: [],
    atEnd: false,
    favouritedMedia: [],
    currentPage: 1,
    loadingData: false,
});
