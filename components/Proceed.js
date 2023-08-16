import tw from "twrnc";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectTravelTimeInformation,
  selectWaypoints,
  setTravelTimeInformation,
} from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Modal, Text, TouchableOpacity } from "react-native";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Proceed = () => {
  const origin = useSelector(selectOrigin);
  const waypoints = useSelector(selectWaypoints);
  const destination = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const disabled = !(
    origin["driver"] !== null &&
    destination["driver"] !== null &&
    origin["passenger1"] !== null &&
    destination["passenger1"] !== null
  );

  const transition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (disabled) {
      Animated.timing(transition, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(transition, {
        toValue: -66,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.bounce
      }).start();
    }
  }, [disabled]);

  const handlePress = async () => {
    Promise.all([
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin['driver'].description}&destinations=${origin['passenger1'].description}&key=${GOOGLE_MAPS_APIKEY}`
      ).then((res) => res.json()),
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${destination['driver'].description}&destinations=${destination['passenger1'].description}&key=${GOOGLE_MAPS_APIKEY}`
      ).then((res) => res.json()),
    ]).then((responses) =>
    dispatch(
      setTravelTimeInformation({
        ...travelTimeInformation,
          "driverToPassengerOrigin": responses[0].rows[0].elements[0],
          "driverToPassengerDestination": responses[1].rows[0].elements[0],
      })
    )).then(navigation.navigate("CalculationScreen"));
  };

  return (
    <Animated.View style={[{transform: [{translateY: transition}]}, tw`absolute right-2 left-2 -bottom-14`]}>
      <TouchableOpacity
        style={
          disabled
            ? tw`bg-gray-200 rounded-xl p-3 mx-3 mb-1 mx-3`
            : tw`bg-sky-300 rounded-xl p-3 mx-3`
        }
        disabled={disabled}
        onPress={handlePress}
      >
        <Text style={tw`text-white text-center text-lg`}>Go</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Proceed;
