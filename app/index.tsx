import React, { useContext, useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { 
  TextInput, 
  Text, 
  Button, 
  ActivityIndicator, 
  Card, 
  Chip, 
  Provider as PaperProvider,
  DefaultTheme,
  Modal, 
  Portal 
} from "react-native-paper";
import { useRouter } from "expo-router";
import { DataContext } from "./DataContext";

// Theme Configuration
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',      // A vibrant blue
    secondary: '#2ecc71',    // A fresh green
    background: '#f4f6f7',   // Light grey-blue background
    surface: '#ffffff',      // White surface color
    accent: '#f39c12',       // Warm orange accent
    error: '#e74c3c',        // Bright red for errors
    text: '#2c3e50',         // Dark grey for text
  },
  roundness: 8,             // Slightly rounded corners
};

// Global Styles
const globalStyles = {
  card: {
    marginVertical: 10,
    elevation: 3,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function Index() {
  const { 
    data, 
    loading, 
    error, 
    reloadData, 
    reloadDataNearbyAttractions, 
    setInputValue, 
    mydistancevalue, 
    categoryValue, 
    filterArticles, 
    selectCategoryValue 
  } = useContext(DataContext);
  
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  // Error handling component
  const ErrorView = () => (
    <View style={globalStyles.centerContent}>
      <Text style={{ color: theme.colors.error, marginBottom: 20 }}>
        錯誤: {error}
      </Text>
      <Button 
        mode="contained" 
        onPress={reloadData}
        style={{ backgroundColor: theme.colors.error }}
      >
        重新嘗試
      </Button>
    </View>
  );

  // Loading component
  const LoadingView = () => (
    <View style={globalStyles.centerContent}>
      <Text style={{ marginBottom: 10, color: theme.colors.text }}>
        資料載入中...
      </Text>
      <ActivityIndicator 
        animating={true} 
        size="large" 
        color={theme.colors.primary} 
      />
    </View>
  );

  // Category selection chips
  const CategoryChips = () => (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ color: theme.colors.text, marginBottom: 10 }}>
        選擇分類: {selectCategoryValue}
      </Text>
      <FlatList
        data={categoryValue}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => (
          <Chip
            onPress={() => filterArticles(item)}
            style={{ 
              marginHorizontal: 5, 
              backgroundColor: theme.colors.secondary 
            }}
            textStyle={{ color: 'white' }}
          >
            {item}
          </Chip>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  // Distance input section
  const DistanceSection = () => (
    <View style={{ marginVertical: 15 }}>
      <Text style={{ color: theme.colors.text, marginBottom: 10 }}>
        搜尋 {mydistancevalue} 公里內的景點
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          mode="outlined"
          label="距離"
          placeholder="請輸入距離"
          onChangeText={(text) => setInputValue(text)}
          style={{ flex: 1, marginRight: 10 }}
          theme={{ colors: { primary: theme.colors.primary } }}
        />
        <Button 
          mode="contained" 
          onPress={reloadDataNearbyAttractions}
          style={{ backgroundColor: theme.colors.primary }}
        >
          搜尋
        </Button>
      </View>
    </View>
  );

  // Attraction card
  const AttractionCard = ({ item }) => (
    <Card 
      style={[globalStyles.card, { 
        backgroundColor: theme.colors.surface 
      }]}
      onPress={() => router.push(`/details?index=${item.id}`)}
    >
      <Card.Content>
        <Text 
          variant="titleLarge" 
          style={{ color: theme.colors.text }}
        >
          {item.name}
        </Text>
        <Text 
          variant="bodyMedium" 
          style={{ color: theme.colors.text }}
        >
          編號: {item.id}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {item.category.map((category, index) => (
            <Chip 
              key={index}
              onPress={() => filterArticles(category)}
              style={{ 
                marginRight: 5, 
                backgroundColor: theme.colors.accent 
              }}
              textStyle={{ color: 'white', fontSize: 12 }}
            >
              {category}
            </Chip>
          ))}
        </View>
      </Card.Content>
    </Card>
  );

  // Main render
  return (
    <PaperProvider theme={theme}>
      <ScrollView 
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Loading State */}
        {loading && <LoadingView />}
        
        {/* Error State */}
        {error && <ErrorView />}
        
        {/* Main Content */}
        {!loading && !error && (
          <>
            <CategoryChips />
            <DistanceSection />
            
            {/* Data Reload Button */}
            <Button 
              mode="outlined" 
              onPress={reloadData}
              style={{ 
                marginVertical: 15, 
                borderColor: theme.colors.primary 
              }}
            >
              重新整理資料
            </Button>
            
            {/* Data Count */}
            <Text style={{ 
              textAlign: 'center', 
              color: theme.colors.text, 
              marginBottom: 10 
            }}>
              共 {data.length} 筆資料
            </Text>
            
            {/* Attractions List */}
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <AttractionCard item={item} />}
              scrollEnabled={false}
            />
          </>
        )}
      </ScrollView>
    </PaperProvider>
  );
}