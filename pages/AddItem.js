import React, { useState } from "react";
import uuid from "react-native-uuid";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

export default function AddItem() {
  const id = uuid.v4();
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async () => {
    try {
      const newItem = {
        id,
        item: itemName,
        quantity,
        category,
      };

      // Save the item data to AsyncStorage
      await AsyncStorage.setItem("List", JSON.stringify(newItem));

      console.log("Item data saved successfully!");
    } catch (error) {
      console.error("Error saving item data:", error);
    }
  };

  const styles = StyleSheet.create({
    input: {
      height: 45,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
  });

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Add Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={(item) => setItemName(item)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
      />
      <MultipleSelectList save="value" label="Categories" placeholder="Select Categories" />
      <Button title="Add Item" onPress={handleSubmit} />
    </View>
  );
}
