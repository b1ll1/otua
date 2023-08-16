import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectWaypoints,
} from "../slices/navSlice";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const waypoints = useSelector(selectWaypoints);
  const mapRef = useRef(null);
  const [otua, setOtua] = useState([]);
  const navigation = useNavigation()

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination", "waypoint"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination, otua]);

  return (
    <SafeAreaView style={tw`bg-gray-100 h-full`}>
      <TouchableOpacity 
      onPress={() => navigation.navigate('HomeScreen')}
      style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
        <Icon name="menu" />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        style={tw`flex-1`}
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="mutedStandard"
      >
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            waypoints={otua}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
        {otua?.length > 0 && waypoints?.location && (
          <Marker
            coordinate={{
              latitude: waypoints.location.lat,
              longitude: waypoints.location.lng,
            }}
            title="Waypoint"
            description={waypoints.description}
            identifier="waypoint"
          />
        )}
      </MapView>
      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
          style={tw`bg-red-200 w-1/3 p-3 rounded-xl m-2`}
          onPress={() => setOtua([])}
        >
          <Text style={tw`text-center`}>My Journey</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-green-200 w-1/3 p-3 rounded-xl m-2`}
          onPress={() => setOtua([waypoints.description])}
        >
          <Text style={tw`text-center`}>Otua :)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;

/*<MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>*/
