import React, { useContext } from "react";
import { ScrollView ,View, Text, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DataContext } from "./DataContext";
import { Linking } from 'react-native';

export default function details() {
  const { index } = useLocalSearchParams();
  const { data } = useContext(DataContext);

  const item = data.filter(x=>x.id==index)[0];
  //const item = data.find((entry) => entry.id === id);


  const makeCall
    = async () => {
      const url
        = item.phone
        ;
      const supported
        = await Linking
          .canOpenURL
          (url);
      await Linking
        .openURL
        (url);
    };




  if (!item) return <Text>內容不存在</Text>;

  return (
    <ScrollView  style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.id}</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
      <Text style={{ marginTop: 10 }}>{item.introduction}</Text>
      <Text style={{ marginTop: 10 }}>地址: {item.address}</Text>
      <Text style={{ marginTop: 10 }}>營業時間: {item.openTime}</Text>
      <Text style={{ marginTop: 10 }}>電話: {item.phone}</Text>
      <Button title="打電話" onPress={makeCall }></Button>
    </ScrollView >
  );
}
