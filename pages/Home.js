import React, { useState } from "react";
import { Text, View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

export default function Home({ items, data, categoryData }) {
  const [selected, setSelected] = useState([]);
  
  return (
    <View style={{ padding: 20 }}>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={categoryData}
        save="value"
        onSelect={() => alert(selected)}
        label="Categories"
      />
      {items.map((item) => {
        return <Text>{item.name}</Text>;
      })}
    </View>
  );
}
