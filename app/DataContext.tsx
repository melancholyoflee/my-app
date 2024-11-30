import React, { createContext, useState, useEffect } from "react";
import* as Location from 'expo-location';

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
     
     const dataUrl = "https://www.twtainan.net/data/attractions_zh-tw.json" ;
const response = await fetch(dataUrl);
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
     
     const dataUrl = "https://www.twtainan.net/data/attractions_zh-tw.json" ;
const response = await fetch(dataUrl);
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
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error, reloadData: loadData,reloadDataNearbyAttractions:reloadDataNearbyAttractions }}>
      {children}
    </DataContext.Provider>
  );
};
