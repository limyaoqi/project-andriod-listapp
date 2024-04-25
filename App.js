import React from "react";
import { View, StatusBar } from "react-native";
import Navbar from "./component/Navbar";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Navbar />
      </NavigationContainer>
    </View>
  );
}
