import React from "react";
import { SearchBar } from "react-native-elements";
import { globalState } from "../Store";
import { useState } from "@hookstate/core";

type SearchBarComponentProps = {};

const MediaSearchBar: React.FunctionComponent<SearchBarComponentProps> = (props: any) => {
    const state = useState(globalState);

    return (
        <SearchBar
            placeholder="Search Movies/TV Shows Here..."
            platform="ios"
            onClear={() => {
                props.onClear();
            }}
            value={state.search.get()}
            onSubmitEditing={() => props.searchCallback()}
            onChangeText={(search) => state.search.set(search)}
            autoCorrect={true}
        />
    );
};

export default MediaSearchBar;
