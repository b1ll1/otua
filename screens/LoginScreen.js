import {
  SafeAreaView,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  getAuth,
} from "firebase/auth";
import tw from "twrnc";
import SignUp from "../components/SignUp";
import OTUA from "../assets/OTUA.png";
import { useNavigation } from "@react-navigation/native";


const LoginScreen = () => {

    const navigation = useNavigation()
    const auth = getAuth()

    useEffect(() => {
       if (auth.currentUser != null) {
        navigation.navigate('HomeScreen')
       }
    })

  return (
    <SafeAreaView style={tw`bg-sky-50 h-full`}>
      <Image
        source={OTUA}
        style={tw`w-40 h-20 mt-30 mb-10 self-center`}
        resizeMode="contain"
      />
      <SignUp />
      </SafeAreaView>
  );
};

export default LoginScreen;
