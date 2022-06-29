import { View, StyleSheet } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { useState } from "@hookstate/core";
import { globalState } from "../Store";

const MediaTypeSelector = (props: any) => {
    const state = useState(globalState);

    return (
        <View style={styles.buttonSection}>
            <ButtonGroup
                selectedButtonStyle={styles.selectedButton}
                onPress={(selectedIndex) => {
                    state.mediaTypeIndex.set(selectedIndex);
                    props.onPress();
                }}
                selectedIndex={state.mediaTypeIndex.get()}
                containerStyle={styles.buttonContainer}
                buttons={["Movies", "TV Shows"]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "white",
        height: 45,
        borderRadius: 10,
    },
    selectedButton: {
        backgroundColor: "tomato",
    },
    buttonSection: {
        backgroundColor: "white",
        paddingBottom: 15,
    },
    button: {
        borderRadius: 10,
    },
});

export default MediaTypeSelector;
