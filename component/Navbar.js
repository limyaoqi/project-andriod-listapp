import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../pages/Home";
import AddItem from "../pages/AddItem";
import Category from "../pages/Category";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialTopTabNavigator();

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    // Toggle the refresh state to trigger a re-fetch of items
    setRefresh((prevRefresh) => !prevRefresh);
  };

  useEffect(() => {
    loadCategoryAndItems();
  }, []);

  const loadCategoryAndItems = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem("Categories");
      const storedItems = await AsyncStorage.getItem("Items");

      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        setCategories(parsedCategories);
      }

      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        setItems(parsedItems);
      }
    } catch (error) {
      console.error("Error loading data from AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    const newData = categories.map((category) => {
      const categoryItems =
        items.length > 0
          ? items.filter((item) => item.category === category)
          : [];
      return {
        category,
        items: categoryItems,
      };
    });
    const categoriesdata = categories.map((category, index) => ({
      key: index + 1,
      value: category,
    }));

    setCategoryData(categoriesdata);
    setData(newData);
  }, [categories, items]);

  useFocusEffect(
    useCallback(() => {
      loadCategoryAndItems();
    }, [refresh]) // Refresh when refresh state changes
  );

  const handleAddCategory = async (newCategory) => {
    try {
      setCategories((prevCategories) => [...prevCategories, newCategory]);

      await AsyncStorage.setItem(
        "Categories",
        JSON.stringify([...categories, newCategory])
      );
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{ title: "Home" }}>
          {(props) => (
            <Home
              {...props}
              data={data}
              items={items}
              categoryData={categoryData}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Add Item" options={{ title: "Add Item" }}>
          {(props) => (
            <AddItem
              {...props}
              items={items}
              categoryData={categoryData}
              handleRefresh={handleRefresh}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Category" options={{ title: "Category" }}>
          {(props) => (
            <Category
              {...props}
              datas={data}
              handleAddCategory={handleAddCategory}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
  );
}
