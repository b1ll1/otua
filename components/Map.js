import { View, Text } from "react-native";
import React, { useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectWaypoints,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useEffect } from "react";

const Map = () => {
  const mapRef = useRef(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  useEffect(() => {
    mapRef.current.fitToSuppliedMarkers([
      "driverOrigin",
      "driverDestination",
      "passengerOrigin",
      "passengerDestination",
    ]);
  }, [origin, destination]);
  return (
    <MapView
      style={tw`flex-1 rounded-xl mx-3 my-1`}
      ref={mapRef}
      initialRegion={{
        latitude: 55.378051,
        longitude: -3.435973,
        latitudeDelta: 15,
        longitudeDelta: 15,
      }}
      mapType="mutedStandard"
    >
      {origin["driver"] && destination["driver"] && (
        <MapViewDirections
          origin={origin["driver"].description}
          destination={destination["driver"].description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={2}
          strokeColor="#0284c7"
        />
      )}

      {origin["driver"]?.location && (
        <Marker
          coordinate={{
            latitude: origin["driver"].location.lat,
            longitude: origin["driver"].location.lng,
          }}
          title="Driver Origin"
          description={origin["driver"].description}
          identifier="driverOrigin"
          pinColor="#7DD3FC"
        />
      )}

      {destination["driver"]?.location && (
        <Marker
          coordinate={{
            latitude: destination["driver"].location.lat,
            longitude: destination["driver"].location.lng,
          }}
          title="Driver Destination"
          description={destination["driver"].description}
          identifier="driverDestination"
          pinColor="#7DD3FC"
        />
      )}
      {origin["passenger1"] && destination["passenger1"] && (
        <MapViewDirections
          origin={origin["passenger1"].description}
          destination={destination["passenger1"].description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={2}
          strokeColor="#7c3aed"
        />
      )}

      {origin["passenger1"]?.location && (
        <Marker
          coordinate={{
            latitude: origin["passenger1"].location.lat,
            longitude: origin["passenger1"].location.lng,
          }}
          title="Passenger Origin"
          description={origin["passenger1"].description}
          identifier="passengerOrigin"
          pinColor="#c4b5fd"
        />
      )}

      {destination["passenger1"]?.location && (
        <Marker
          coordinate={{
            latitude: destination["passenger1"].location.lat,
            longitude: destination["passenger1"].location.lng,
          }}
          title="Passenger Destination"
          description={destination["passenger1"].description}
          identifier="passengerDestination"
          pinColor="#c4b5fd"
        />
      )}
    </MapView>
  );
};

export default Map;
