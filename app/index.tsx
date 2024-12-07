import React, { useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { TextInput, Text, Button, ActivityIndicator, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { DataContext } from "./DataContext";
import { TouchableOpacity } from 'react-native';
export default function Index() {
  const { data, loading, error, reloadData, reloadDataNearbyAttractions, setInputValue, setInputValueHashtag ,mydistancevalue,categoryValue,filterArticles,selectCategoryValue} =
    useContext(DataContext);
  const router = useRouter();

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
    <Text>現在分類:{selectCategoryValue}</Text>

    
       <FlatList
        data={categoryValue}
        keyExtractor={(item, index) => index.toString()}
        horizontal // Enables horizontal scrolling
   
        renderItem={({ item }) => (
        
          <TouchableOpacity onPress={() => filterArticles(item)}>
          <Card    style={styles.card}>
            <Card.Content>
            <Text style={styles.text}>{item}</Text>
            </Card.Content>
          </Card>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      />
    
    <View>
     <Text>現在距離{mydistancevalue}公里的景點</Text>
     <View style={styles.Row}> 
      <TextInput
        mode="outlined"
        label="距離"
        placeholder="請輸入距離"
        onChangeText={(text) => setInputValue(text)}
        style={styles.input}
      /> 
     <View style={styles.buttonRow}> 
         <Button mode="contained" onPress={reloadDataNearbyAttractions} style={styles.button}>
          附近景點
        </Button>
        </View>
        </View>
</View>

      <View style={styles.buttonRow}> 
       
        <Button mode="contained" onPress={reloadData} style={styles.button}>
          重新取得資料
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
                <Button mode="text" onPress={() => filterArticles(subItem)}>
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

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
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
    flexDirection: "row",
    width:"50%",
    marginBottom: 20,
  },
  
  Row: {
    flexDirection: "row",
 
  },
  buttonRow: {
    flexDirection: "row",
    width:200,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  card: {
    color:'red',
    marginVertical: 10,
  }, text: {

    height:100,
    marginVertical: 5,
  },
});
