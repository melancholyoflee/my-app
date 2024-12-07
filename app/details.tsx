import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DataContext } from "./DataContext";
import { Text, Button, Card } from "react-native-paper";
import { Linking } from "react-native";

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
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={makeCall} style={styles.button}>
        打電話
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },
});