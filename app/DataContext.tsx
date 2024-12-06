import React, { createContext, useState, useEffect } from "react";
import * as Location from 'expo-location';

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 地球半徑（公里）
  const toRad = (angle) => (angle * Math.PI) / 180; // 將度數轉為弧度
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // 距離（公里）
}

function findNearbyAttractions(currentLat, currentLon, attractions, maxDistance) {
  return attractions.filter((attraction) => {
    const distance = haversineDistance(
      currentLat,
      currentLon,
      attraction.lat,
      attraction.long
    );
    return distance <= maxDistance; // 篩選出距離小於等於 maxDistance 的景點
  });
}

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let value = 10;
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {

      const dataUrl = "https://www.twtainan.net/data/attractions_zh-tw.json";
      const response = await fetch(proxyUrl + dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP 錯誤，狀態碼: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('無法取得定位權限');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      console.log(`經度：${loc.coords.longitude}, 緯度：${loc.coords.latitude}`);
    })();


  }, []);

  const reloadDataNearbyAttractions = async () => {
    setLoading(true);
    setError(null);
    try {

      const dataUrl = "https://www.twtainan.net/data/attractions_zh-tw.json";
      const response = await fetch(proxyUrl + dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP 錯誤，狀態碼: ${response.status}`);
      }
      let result = await response.json();

      console.log(location);
      var distancevalue = 10;
      if (value != 10) {
        distancevalue = value;
      }
      result = findNearbyAttractions(location.coords.latitude, location.coords.longitude, result, distancevalue)

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const setInputValueHashtag = async (inputValue) => {
    setLoading(true);
    setError(null);
    try {

      const dataUrl = "https://www.twtainan.net/data/attractions_zh-tw.json";
      const response = await fetch(proxyUrl + dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP 錯誤，狀態碼: ${response.status}`);
      }
      let result = await response.json();

      console.log(location);
      var distancevalue = 10;
      if (value != 10) {
        distancevalue = value;
      }
      result = result.filter(x=>x.category.some(y=>y.includes(inputValue)) )

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const setInputValue = async (inputValue) => {
    value = inputValue;
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error, reloadData: loadData, reloadDataNearbyAttractions: reloadDataNearbyAttractions, setInputValue: setInputValue ,setInputValueHashtag:setInputValueHashtag }}>
      {children}
    </DataContext.Provider>
  );
};
