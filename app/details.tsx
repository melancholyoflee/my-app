import React, { useContext } from "react";
import { View,ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DataContext } from "./DataContext";
import { Text, Button, Card } from "react-native-paper";
import { Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Details() {
  const { index } = useLocalSearchParams();
  const { data } = useContext(DataContext);

  const item = data.find((x) => x.id == index);

  const makeCall = async () => {
    const url = `tel:${item.tel}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  if (!item) return <Text style={styles.error}>內容不存在</Text>;

  return (
   
      <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{item.name}</Text>
          <Text variant="bodyMedium">{item.id}</Text>
          <Text style={styles.text}>介紹: {item.introduction}</Text>
          <Text style={styles.text}>地址: {item.address}</Text>
          <Text style={styles.text}>營業時間: {item.open_time}</Text>
          <Text style={styles.text}>電話: {item.tel}</Text>
          <Text style={styles.text}>latitude: {item.lat}</Text>
          <Text style={styles.text}>longitude: {item.long}</Text>
           <Button mode="contained" onPress={makeCall} style={styles.button}>
        打電話
      </Button>
    
      <MapView
  style={styles.map}
  initialRegion={{
    latitude: item.lat, // 初始纬度
    longitude: item.long, // 初始经度
    latitudeDelta: 0.01, // 垂直方向的显示范围
    longitudeDelta: 0.01, // 水平方向的显示范围
  }}
>
  <Marker coordinate={{ latitude: item.lat, longitude: item.long }} />
</MapView>
        </Card.Content>
      
      </Card>
      
   
    </ScrollView> 
  
      
   
    
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
  },
  text: {
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
  },
  error: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "red",
  }, map: {
    height:300 ,
    width:"100%"
  },
});