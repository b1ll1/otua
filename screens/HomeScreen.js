import { SafeAreaView, Image, Text, TouchableOpacity } from "react-native";
import OTUA from "../assets/OTUA.png";
import tw from "twrnc";
import React from "react";
import Proceed from "../components/Proceed";
import Map from "../components/Map";
import { getAuth } from "firebase/auth";
//import { getDatabase, onValue, ref } from "firebase/database";
import TravelInput from "../components/TravelInput";

const HomeScreen = () => {
 // const auth = getAuth();
  //const database = getDatabase();
  //const db = getDatabase();
  //const starCountRef = ref(db, "friends/");
  
  const handlePress = () => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  };

  return (
    <SafeAreaView style={tw`bg-sky-50 h-full`}>
      <Image source={OTUA} style={tw`w-20 h-20 ml-5`} resizeMode="contain" />
      {false && (
        <TouchableOpacity
          style={tw`absolute top-10 right-10 bg-sky-400 px-5 py-5 rounded-full shadow-lg`}
          onPress={handlePress}
        >
          <Text style={tw`text-lg text-white`}>
            {auth.currentUser.email[0]}
          </Text>
        </TouchableOpacity>
      )}
      <TravelInput userImage="👨🏼️" user="driver" colour="sky" />
      <TravelInput userImage="👤" user="passenger1" colour="violet" />
      <Map />
      <Proceed />
    </SafeAreaView>
  );
};

export default HomeScreen;
