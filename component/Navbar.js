import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Home from "../pages/Home";
import AddItem from "../pages/AddItem";
import Category from "../pages/Category";

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

export default function Navbar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // screenOptions={{
        //   tabBarStyle: {
        //     justifyContent: "center",
        //   },
        // }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          //   options={{ title: "Grocery List App" }}
        />
        <Tab.Screen
          name="Add Item"
          component={AddItem}
          //   options={{ title: "My Grocery List" }}
        />
        <Tab.Screen
          name="Grocery List"
          component={Category}
          //   options={{ title: "Add Item" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
