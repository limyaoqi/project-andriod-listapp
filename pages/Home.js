import React from "react";
import { Text, View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

export default function Home() {
  const [selected, setSelected] = React.useState([]);

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  return (
    <View style={{ padding: 20 }}>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        onSelect={() => alert(selected)}
        label="Categories"
      />
    </View>
  );
}
