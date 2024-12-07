import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DataContext } from "./DataContext";
import { 
  Text, 
  Button, 
  Card, 
  IconButton, 
  Surface, 
  Divider 
} from "react-native-paper";
import { Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Details() {
  const { index } = useLocalSearchParams();
  const { data } = useContext(DataContext);

  // Find the current attraction based on the index
  const item = data.find((x) => x.id == index);

  const makeCall = async () => {
    const url = `tel:${item.tel}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  if (!item) return (
    <Surface style={styles.errorContainer}>
      <Text style={styles.errorText}>景點資訊不存在</Text>
    </Surface>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Attraction Card */}
      <Card style={styles.card}>
        <Card.Title 
          title={item.name}
          subtitle={`景點 ID: ${item.id}`}
          titleStyle={styles.cardTitle}
        />
        <Card.Content>
          <Text style={styles.sectionTitle}>景點介紹</Text>
          <Text style={styles.description}>{item.introduction}</Text>
          
          <Divider style={styles.divider} />
          
          <Text style={styles.infoText}>
            <Text style={styles.boldLabel}>地址: </Text>
            {item.address}
          </Text>
          
          <Text style={styles.infoText}>
            <Text style={styles.boldLabel}>營業時間: </Text>
            {item.open_time}
          </Text>
          
          <Text style={styles.infoText}>
            <Text style={styles.boldLabel}>電話: </Text>
            {item.tel}
          </Text>
        </Card.Content>
        
        {/* Call Button */}
        <Card.Actions>
          <Button 
            mode="contained" 
            onPress={makeCall} 
            style={styles.callButton}
          >
            撥打電話
          </Button>
        </Card.Actions>
      </Card>

      {/* Map Section */}
      <Surface style={styles.mapContainer}>
        <Text style={styles.sectionTitle}>景點位置</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.long),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(item.lat),
              longitude: parseFloat(item.long),
            }}
            title={item.name}
            description={item.address}
          />
        </MapView>
        
        {/* Coordinates Information */}
        <Text style={styles.coordinatesText}>
          <Text style={styles.boldLabel}>緯度: </Text>
          {item.lat}
          <Text style={styles.boldLabel}>  經度: </Text>
          {item.long}
        </Text>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6200ee',
  },
  description: {
    marginBottom: 16,
    lineHeight: 22,
  },
  infoText: {
    marginVertical: 6,
    fontSize: 14,
  },
  boldLabel: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
  divider: {
    marginVertical: 12,
  },
  callButton: {
    marginTop: 8,
  },
  mapContainer: {
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
  },
  map: {
    height: 250,
    width: '100%',
  },
  coordinatesText: {
    padding: 12,
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});