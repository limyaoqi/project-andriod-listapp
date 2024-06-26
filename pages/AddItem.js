import React, { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { Text, View, TextInput, Button, StyleSheet, Image } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function AddItem({ items, categoryData, handleRefresh }) {
  const id = uuid.v4();
  const navigation = useNavigation();
  const [item, setItems] = useState(items);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (!itemName.trim()) {
      alert("Item name is required.");
      return;
    }

    if (!quantity.trim() || isNaN(quantity)) {
      alert("Quantity must be a valid number.");
      return;
    }

    if (!category) {
      alert("Please select a category.");
      return;
    }

    try {
      const newItem = {
        id,
        name: itemName,
        quantity,
        category,
        image,
      };

      setItems((prevItems) => [...prevItems, newItem]);

      await AsyncStorage.setItem("Items", JSON.stringify([...items, newItem]));
      handleRefresh();
      setItemName("");
      setQuantity("");
      setCategory(null);
      setImage(null);

      console.log("Item data saved successfully!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving item data:", error);
      alert("Error", error.message);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
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
      paddingLeft: 20,
    },
    imageContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: "cover",
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
        placeholderTextColor={"black"}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
        placeholderTextColor={"black"}
      />
      <SelectList
        save="value"
        label="Category"
        placeholder="Select Category"
        setSelected={(val) => setCategory(val)}
        data={categoryData}
        search={false}
      />
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <Button
          title="Select Image"
          onPress={pickImage}
          style={{ marginBottom: 5 }}
        />
        {image && (
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
        )}
      </View>
      <Button title="Add Item" onPress={handleSubmit} />
    </View>
  );
}
