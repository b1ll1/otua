import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

export default function JourneyDecision(props) {
  return (
    <View
      style={tw`bg-white mx-3 my-1 rounded-lg shadow-xl border-${props.decision.colour}-300 border p-3`}
    >
      <View style={tw`bg-${props.decision.colour}-300 w-10 h-10 self-center justify-center rounded-full shadow-lg mb-2`}>
        <Text style={tw`text-center`}>{props.decision.thumb}</Text>
        </View>
      {props.decision.share ? (
        <View><Text style={tw`text-center mb-2`}>You could save £{(props.decision.savings)} by travelling together!</Text>
        <Text style={tw`text-center`}>{props.decision.driver} to drive and {props.decision.passenger} to transfer £{(props.decision.payment)} to cover their costs 🤝</Text></View>
      ) : (
        <Text style={tw`text-justify`}>
          Travel separately! Otua was unable to find a shared journey that would
          save you money and protect the environment further.{" "}
        </Text>
      )}
    </View>
  );
}
