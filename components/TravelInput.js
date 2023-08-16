import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ShadowPropTypesIOS,
} from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectTravelTimeInformation,
  setDestination,
  setOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import tw from "twrnc";
import { useState } from "react";
import JourneyMetrics from "./JourneyMetrics";
import { useEffect } from "react";

const TravelInput = (props) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const toInputBoxStyles = StyleSheet.create({
    container: {
      flex: 0,
    },
    textInput: tw`bg-${props.colour}-50 text-${props.colour}-400 text-base`,
    description: {
      fontSize: 14,
    },
  });

  useEffect(() => {
    if (origin[props.user] && destination[props.user]) {
      Promise.all([
        fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
            origin[props.user].description
          }&destinations=${
            destination[props.user].description
          }&key=${GOOGLE_MAPS_APIKEY}`
        ).then((res) => res.json()),
      ]).then((responses) =>
        dispatch(
          setTravelTimeInformation({
            ...travelTimeInformation,
            [props.user]: {
              originToDestination: responses[0].rows[0].elements[0],
            },
          })
        )
      );
    }
  }, [origin[props.user], destination[props.user]]);

  return (
    <Animated.View style={tw`bg-white mx-3 my-1 rounded-lg shadow-xl`}>
      <View style={tw`flex flex-row items-center`}>
        <View
          style={tw`bg-${props.colour}-400 w-10 h-10 rounded-full shadow-lg justify-center m-3`}
        >
          <Text style={tw`text-center text-xl`}>{props.userImage}</Text>
        </View>
        <View style={tw`w-4/5 mt-1`}>
          <GooglePlacesAutocomplete
            placeholder="ORIGIN"
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  ...origin,
                  [props.user]: {
                    location: details.geometry.location,
                    description: data.description,
                  },
                })
              );
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
              //components: "country:uk",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            textInputProps={{
              clearButtonMode: "while-editing",
              onChangeText: () => [
                dispatch(
                  setOrigin({
                    ...origin,
                    [props.user]: null,
                  })
                ),
                dispatch(
                  setTravelTimeInformation({
                    ...travelTimeInformation,
                    [props.user]: null,
                  })
                ),
              ],
            }}
          />
          <GooglePlacesAutocomplete
            placeholder="DESTINATION"
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  ...destination,
                  [props.user]: {
                    location: details.geometry.location,
                    description: data.description,
                  },
                })
              );
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
              //components: "country:uk",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            textInputProps={{
              clearButtonMode: "while-editing",
              onChangeText: () => [
                dispatch(
                  setDestination({
                    ...destination,
                    [props.user]: null,
                  })
                ),
                dispatch(
                  setTravelTimeInformation({
                    ...travelTimeInformation,
                    [props.user]: null,
                  })
                ),
              ],
            }}
          />
        </View>
      </View>
      {travelTimeInformation[props.user] && (
        <JourneyMetrics user={props.user} colour={props.colour} />
      )}
    </Animated.View>
  );
};

export default TravelInput;
