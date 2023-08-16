import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import OTUA from "../assets/OTUA.png";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import JourneyDecision from "../components/JourneyDecision";
import JourneySummary from "../components/JourneySummary";
import OtuaMap from "../components/OtuaMap";

const CalculationScreen = () => {
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const navigation = useNavigation();
  const [decision, setDecision] = useState({
    share: true,
    driver: "👨🏼",
    colour: "green",
    thumb: "👎",
  });

  const [driverSummary, setDriverSummary] = useState({
    avatar: "👨🏼",
    colour: "sky",
    initialDistance:
      travelTimeInformation["driver"].originToDestination?.distance.text,
    initialTime:
      travelTimeInformation["driver"].originToDestination?.duration.text,
    initialCost: costCalculator(
      travelTimeInformation["driver"].originToDestination?.distance.value
    ).toFixed(2),
  });
  const [passengerSummary, setPassengerSummary] = useState({
    avatar: "👤",
    colour: "violet",
    initialDistance:
      travelTimeInformation["passenger1"].originToDestination?.distance.text,
    initialTime:
      travelTimeInformation["passenger1"].originToDestination?.duration.text,
    initialCost: costCalculator(
      travelTimeInformation["passenger1"].originToDestination?.distance.value
    ).toFixed(2),
  });

  useEffect(() => calculateBestPlan(), [travelTimeInformation]);

  function secondsToHms(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);

    let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";
    return hDisplay + mDisplay;
  }

  function calculateBestPlan() {
    const distanceTravellingSeparately =
      travelTimeInformation["driver"].originToDestination?.distance.value +
      travelTimeInformation["passenger1"]?.originToDestination?.distance.value;
    const distanceWhenDriverDriving =
      travelTimeInformation["driverToPassengerOrigin"]?.distance.value +
      travelTimeInformation["passenger1"]?.originToDestination?.distance.value +
      travelTimeInformation["driverToPassengerDestination"]?.distance.value;
    const distanceWhenPassengerDriving =
      travelTimeInformation["driverToPassengerOrigin"]?.distance.value +
      travelTimeInformation["driver"]?.originToDestination?.distance.value +
      travelTimeInformation["driverToPassengerDestination"]?.distance.value;

    const durationWhenDriverDriving =
      travelTimeInformation["driverToPassengerOrigin"]?.duration.value +
      travelTimeInformation["passenger1"]?.originToDestination?.duration.value +
      travelTimeInformation["driverToPassengerDestination"]?.duration.value;
    const durationWhenPassengerDriving =
      travelTimeInformation["driverToPassengerOrigin"]?.duration.value +
      travelTimeInformation["driver"]?.originToDestination?.duration.value +
      travelTimeInformation["driverToPassengerDestination"]?.duration.value;

    if (
      distanceWhenDriverDriving < distanceTravellingSeparately &&
      distanceWhenDriverDriving <= distanceWhenPassengerDriving
    ) {
      setDecision({
        ...decision,
        share: true,
        driver: "👨🏼",
        passenger: "👤",
        colour: "green",
        thumb: "👍",
        savings: costCalculator(
          distanceTravellingSeparately - distanceWhenDriverDriving
        ).toFixed(2),
        payment: (
          costCalculator(
            travelTimeInformation["passenger1"]?.originToDestination.distance
              .value
          ) -
          costCalculator(
            distanceTravellingSeparately - distanceWhenDriverDriving
          ) /
            2
        ).toFixed(2),
      });
      setDriverSummary({
        ...driverSummary,
        finalDistance: `${(distanceWhenDriverDriving * 1e-3).toFixed(1)} km`,
        finalTime: secondsToHms(durationWhenDriverDriving),
        finalCost: (
          costCalculator(
            travelTimeInformation["driver"].originToDestination.distance.value
          ) -
          costCalculator(
            distanceTravellingSeparately - distanceWhenDriverDriving
          ) /
            2
        ).toFixed(2),
      });
      setPassengerSummary({
        ...passengerSummary,
        finalDistance:
          travelTimeInformation["passenger1"].originToDestination?.distance
            .text,
        finalTime:
          travelTimeInformation["passenger1"].originToDestination.duration.text,
        finalCost: (
          costCalculator(
            travelTimeInformation["passenger1"].originToDestination.distance
              .value
          ) -
          costCalculator(
            distanceTravellingSeparately - distanceWhenDriverDriving
          ) /
            2
        ).toFixed(2),
      });
    } else if (
      distanceWhenPassengerDriving < distanceTravellingSeparately &&
      distanceWhenPassengerDriving < distanceWhenDriverDriving
    ) {
      setDecision({
        ...decision,
        share: true,
        driver: "👤",
        passenger: "👨🏼",
        colour: "green",
        thumb: "👍",
        savings: costCalculator(
          distanceTravellingSeparately - distanceWhenPassengerDriving
        ).toFixed(2),
        payment: (
          costCalculator(
            travelTimeInformation["driver"]?.originToDestination.distance.value
          ) -
          costCalculator(
            distanceTravellingSeparately - distanceWhenPassengerDriving
          ) /
            2
        ).toFixed(2),
      });
      setPassengerSummary({
        ...passengerSummary,
        finalDistance: `${(distanceWhenPassengerDriving * 1e-3).toFixed(1)} km`,
        finalTime: secondsToHms(durationWhenPassengerDriving),
        finalCost: (
          costCalculator(
            travelTimeInformation["passenger1"].originToDestination.distance
              .value
          ) -
          costCalculator(
            distanceTravellingSeparately - distanceWhenPassengerDriving
          ) /
            2
        ).toFixed(2),
      });
      setDriverSummary({
        ...driverSummary,
        finalDistance:
          travelTimeInformation["driver"].originToDestination?.distance.text,
        finalTime:
          travelTimeInformation["driver"].originToDestination.duration.text,
        finalCost: (
          costCalculator(
            travelTimeInformation["driver"].originToDestination.distance.value
          ) -
          costCalculator(
            distanceTravellingSeparately - distanceWhenPassengerDriving
          ) /
            2
        ).toFixed(2),
      });
    } else {
      setDecision({
        ...decision,
        share: false,
        colour: "red",
        thumb: "👎",
      });
      setPassengerSummary({
        ...passengerSummary,
        finalDistance:
          travelTimeInformation["passenger1"].originToDestination?.distance
            .text,
        finalTime:
          travelTimeInformation["passenger1"].originToDestination.duration.text,
        finalCost: costCalculator(
          travelTimeInformation["passenger1"].originToDestination?.distance
            .value
        ).toFixed(2),
      });
      setDriverSummary({
        ...driverSummary,
        finalDistance:
          travelTimeInformation["driver"].originToDestination?.distance.text,
        finalTime:
          travelTimeInformation["driver"].originToDestination.duration.text,
        finalCost: costCalculator(
          travelTimeInformation["driver"].originToDestination?.distance
            .value
        ).toFixed(2),
      });
    }
  }

  function costCalculator(distance) {
    const cost = ((distance * 1e-3) / 1.609 / 50) * 4.5461 * 1.75;

    return cost;
  }
  return (
    <SafeAreaView style={tw`bg-sky-50 h-full`}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={tw`bg-white absolute top-10 left-5 z-50 p-2 rounded-full shadow-lg`}
      >
        <Icon name="chevron-left" />
      </TouchableOpacity>
      <View
        style={tw`bg-sky-300 w-10 h-10 mt-5 mr-5 mb-5 self-end rounded-lg justify-center`}
      >
        <Text style={tw`text-sm text-white text-center font-light`}>
          OT{"\n"}UA
        </Text>
      </View>
      <JourneyDecision decision={decision} />
      <JourneySummary summary={driverSummary} />
      <JourneySummary summary={passengerSummary} />
      <OtuaMap share={decision.share} driver={decision.driver}/>
    </SafeAreaView>
  );
};

export default CalculationScreen;
