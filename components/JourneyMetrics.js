import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const JourneyMetrics = (props) => {
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const originToDestinationCost =
    travelTimeInformation[props.user]?.originToDestination?.distance.value /
      1e3 /
      1.609 /
      50 *
    4.5461 *
    1.75;
  return (
    <View style={tw`bg-${props.colour}-300 rounded-b-lg flex-row justify-evenly items-center p-2`}>
      <Text style={tw`text-white text-center`}>
        📏:{" "}
        {travelTimeInformation[props.user]?.originToDestination?.distance.text}
      </Text>
      <Text style={tw`text-white text-center`}>
        ⌛:{" "}
        {travelTimeInformation[props.user]?.originToDestination?.duration.text}
      </Text>
      <Text style={tw`text-white text-center`}>💷 : £{originToDestinationCost.toFixed(2)} </Text>
    </View>
  );
};

export default JourneyMetrics;
