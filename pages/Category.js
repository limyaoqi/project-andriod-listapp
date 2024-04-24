import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";

export default function MyComponent() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [itemNum, setItemNum] = useState(1);
  const navigation = useNavigation();

  const containerStyle = {
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 5,
    borderRadius: 6,
    paddingBottom: isDropdownOpen ? 5 : 5 * itemNum,
  };

  useEffect(() => {
    loadCategories();
    // loadItems();
  }, []);

  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem("Categories");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
        const storedItems = await AsyncStorage.getItem("Items");
        if (storedItems) {
          const item = JSON.parse(storedItems);
          const filteredItems = item
            .filter((item) => item.category === category)
            .map((item) => ({
              label: item.name,
              value: item.id,
            }));
          setItems(filteredItems);
        }
      }
    } catch (error) {
      console.error("Error loading categories from AsyncStorage: ", error);
    }
  };

  // const loadItems = async () => {
  //   try {
  //     const storedItems = await AsyncStorage.getItem("Items");
  //     if (storedItems) {
  //       setItems(JSON.parse(storedItems));
  //     }
  //   } catch (error) {
  //     console.error("Error loading items from AsyncStorage: ", error);
  //   }
  // };

  const handleAddCategory = async () => {
    if (categoryName.trim() !== "") {
      setCategories((prevCategories) => [...prevCategories, categoryName]);
      setCategoryName("");
      await AsyncStorage.setItem(
        "Categories",
        JSON.stringify([...categories, categoryName])
      );
    }
  };

  // /*
  //   the dropdown need something like
  //   const data = [
  //     {label:{the option word},value:{this is the value}}
  //   ]
  //   <Dropdown data={data} labelField="label" valueField="value" />
  //   so now the thing is there have handleAddCategory to add a newCategory
  //   after create the category it will find the Item that same with category
  //   so we need a filter to filter out the item that not same category
  //   after that we need to set to object to display the dropdown
  //   so 1 category 1 dropdown, inisde dropdown got many item that same with the category
  // */

  //   const handleAddCategory = async () => {
  //     //the input if not empty
  //     if (categoryName.trim() !== "") {
  //       //set the category to old=new
  //       setCategories((oldCategories) => [...oldCategories, categoryName]);
  //       //try to data from local storage that key=categories
  //       let currentLS = await AsyncStorage.getItem("categories");
  //       const id = uuid.v4();
  //       //if got data
  //       if (currentLS !== null) {
  //         currentLS = JSON.parse(currentLS); //[fruit]
  //         currentLS.push({ value: id, label: categoryName }); //[fruit, food]
  //         await AsyncStorage.setItem("categories", JSON.stringify(currentLS));
  //       } else {
  //         await AsyncStorage.setItem(
  //           "categories",
  //           JSON.stringify([{ value: id, label: categoryName }])
  //         );
  //       }
  //       fetchData();
  //     }
  //   };

  //   const fetchData = async () => {
  //     const category = await AsyncStorage.getItem("categories");
  //     if (category.length) {
  //       setCategories(JSON.parse(category));
  //     } else {
  //       setCategories([]);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Categories</Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginRight: 10,
            paddingHorizontal: 10,
          }}
          placeholder="Category Name"
          value={categoryName}
          onChangeText={(text) => setCategoryName(text)}
        />
        <Button title="Add" onPress={handleAddCategory} />
      </View>

      {categories.map((category) => {
        const filteredItems = items.filter(
          (item) => item.category === category
        );

        // Transform filtered items to dropdown data format
        const Item = filteredItems.map((item) => ({
          label: item.name,
          value: item.id,
        }));

        return (
          <View key={category} style={containerStyle}>
            <Dropdown
              data={Item}
              labelField="label"
              valueField="value"
              placeholder={`${category}`}
              style={{
                backgroundColor: "black",
                borderRadius: 6,
                flex: 1,
                padding: 20,
              }}
              placeholderStyle={{
                color: "white",
                justifyContent: "center",
                padding: 5,
              }}
            />
          </View>
        );
      })}
    </View>
  );
}
