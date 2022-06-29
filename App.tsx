import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Search from "./screens/Search";
import Favourites from "./screens/Favourites";
import { loadFavourites } from "./Storage";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();

const App = () => {
    useEffect(() => {
        loadFavourites();
    });

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = route.name === "Search" ? "search-outline" : "star-outline";

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                })}>
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Favourites" component={Favourites} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
