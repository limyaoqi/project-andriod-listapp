import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { useState } from "react";

export default function Category({ datas,handleAddCategory }) {
  const[newCategory,setNewCategory]=useState("")
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
  const containerStyle = {
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 5,
    borderRadius: 6,
  };
  

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Categories</Text>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
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
          value={newCategory}
          onChangeText={(text) => setNewCategory(text)}
        />
        <Button title="Add" onPress={()=>{handleAddCategory(newCategory);setNewCategory("")}} />
      </View>
      {datas.map((data) => (
        <View key={data.category} style={containerStyle}>
          <Collapse key={data.category}>
            <CollapseHeader>
              <Text
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: 10,
                }}
              >
                {data.category}
              </Text>
            </CollapseHeader>
            <CollapseBody style={{ borderTop: "2px solid white" }}>
              {data.items.length < 1 ? (
                <View
                  style={{
                    backgroundColor: "black",
                    padding: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>
                    There are no items in this category
                  </Text>
                </View>
              ) : (
                data.items.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: "black",
                        padding: 10,
                      }}
                      onPress={() => alert("hi")}
                    >
                      <Text style={{ color: "white" }}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })
              )}
            </CollapseBody>
          </Collapse>
        </View>
      ))}
    </View>
  );
}
