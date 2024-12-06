import React, { useContext } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { DataContext } from "./DataContext";

export default function index() {
  const { data, loading, error, reloadData, reloadDataNearbyAttractions, setInputValue } = useContext(DataContext);
  const router = useRouter();

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 10 }}>資料載入中...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>錯誤: {error}</Text>
        <Button title="重新嘗試" onPress={reloadData} />
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="請輸入距離"
        onChangeText={(text) => setInputValue(text)}></TextInput>
      <Button title="重新取得資料" onPress={reloadData} />
      <Button title="附近的景點" onPress={reloadDataNearbyAttractions} />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => router.push(`/details?index=${item.id}`)} >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {item.id}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {item.name}
            </Text>

            <FlatList data={item.category} renderItem={({ item, index }) => (

              <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => console.log('ok')} >
                <Text style={{ fontSize: 10 }}>
                  {item}
                </Text>
              </TouchableOpacity>

            )}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
