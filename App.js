import React from "react";
import { View, StatusBar, SafeAreaView } from "react-native";
import Navbar from "./component/Navbar";
// import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (

      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Navbar />
      </View>
  );
}
