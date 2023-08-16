import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useRef } from "react";
import * as Location from "expo-location";
import { useState } from "react";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  const auth = getAuth();
  const database = getDatabase();
  const db = getDatabase();
  
  console.log(typeof(DEFAULT_USERNAME))
  console.log(typeof(DEFAULT_PASSWORD))
  signInWithEmailAndPassword(auth, "1@1.com", "123456")
  .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Signed in...");
      const starCountRef = ref(db, "/friends");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      });
      //navigation.navigate("HomeScreen");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Not logging in properly");
      console.log(errorMessage);
    });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);
  useEffect(() => {
    mapRef.current.fitToSuppliedMarkers(["location"]);
  }, [location]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView>
      <Text>{text}</Text>
      <Text>{new Date(location?.timestamp).getDate()}</Text>
      <MapView style={styles.map} ref={mapRef}>
        <Marker
          coordinate={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
          }}
          identifier="location"
        ></Marker>
      </MapView>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
