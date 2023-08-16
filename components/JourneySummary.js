import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

const JourneySummary = (props) => {
  return (
    <View style={tw`bg-white mx-3 my-1 rounded-lg shadow-xl`}>
      <View style={tw`bg-${props.summary.colour}-300 rounded-t-lg items-center`}>
        <View
        style={tw`bg-white w-5 h-5 rounded-full shadow-lg justify-center m-1`}
        >
        <Text style={tw`text-center text-xs`}>{props.summary.avatar}</Text>
      </View>
          </View>
      <View style={tw`flex-row justify-between m-2`}>
      <View style={tw`justify-center`}>
        <Text style={tw``}>📏: {props.summary.initialDistance}</Text>
        <Text style={tw``}>⌛: {props.summary.initialTime}</Text>
        <Text style={tw``}>💷 : £{props.summary.initialCost}</Text>
      </View>
      <View style={tw`bg-${props.summary.colour}-300 w-5 h-5 self-center justify-center rounded-full shadow-lg mb-2`}>
        <Text style={tw`text-center text-xs`}>👉</Text>
        </View>
      <View style={tw`justify-center`}>
        <Text style={tw``}>📏: {props.summary.finalDistance}</Text>
        <Text style={tw``}>⌛: {props.summary.finalTime}</Text>
        <Text style={tw``}>💷 : £{props.summary.finalCost}</Text>
      </View>
      </View>
    </View>
  );
};

export default JourneySummary;
