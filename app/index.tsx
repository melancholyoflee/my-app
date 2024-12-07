import React, { useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { TextInput, Text, Button, ActivityIndicator, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { DataContext } from "./DataContext";

export default function Index() {
  const { data, loading, error, reloadData, reloadDataNearbyAttractions, setInputValue, setInputValueHashtag ,mydistancevalue,categoryValue} =
    useContext(DataContext);
  const router = useRouter();
   console.log("distancevalue:"+mydistancevalue);
   console.log("categoryValue:"+categoryValue);
  if (loading)
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 10 }}>資料載入中...</Text>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>錯誤: {error}</Text>
        <Button mode="contained" onPress={reloadData}>
          重新嘗試
        </Button>
      </View>
    );

  return (
  
    <View style={styles.container}> 
     <Text>現在距離{mydistancevalue}公里的景點</Text>
 
      <TextInput
        mode="outlined"
        label="距離"
        placeholder="請輸入距離"
        onChangeText={(text) => setInputValue(text)}
        style={styles.input}
      />
      <View style={styles.buttonRow}>
        <Button mode="contained" onPress={reloadData} style={styles.button}>
          重新取得資料
        </Button>
        <Button mode="contained" onPress={reloadDataNearbyAttractions} style={styles.button}>
          附近的景點
        </Button>
      </View>

      <Text>共{data.length}筆</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => router.push(`/details?index=${item.id}`)}
          >
            <Card.Content>
              <Text variant="titleLarge">{item.name}</Text>
              <Text variant="bodyMedium">{item.id}</Text>
            </Card.Content>
            <FlatList
              data={item.category}
              keyExtractor={(subItem, index) => index.toString()}
              renderItem={({ item: subItem }) => (
                <Button mode="text" onPress={() => setInputValueHashtag(subItem)}>
                  {subItem}
                </Button>
              )}
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  card: {
    marginVertical: 10,
  },
});
