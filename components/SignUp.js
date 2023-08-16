import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAlready, setUserAlready] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed in...");
        navigation.navigate('HomeScreen')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Not logging in properly");
        console.log(errorMessage);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={tw`border-sky-200 rounded-t-lg border-2 p-5 w-4/5 self-center mt-5 text-lg`}
      ></TextInput>
      <TextInput
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={tw`border-sky-200 rounded-b-lg border-2 border-t-0 p-5 w-4/5 self-center text-lg`}
      ></TextInput>
      {
        <TouchableOpacity
          style={tw`bg-sky-400 p-5 w-4/5 rounded-lg self-center mt-2`}
          onPress={!userAlready ? createUser : signIn}
        >
          <Text style={tw`text-white text-center`}>
            {!userAlready ? "Create Account" : "Sign In"}
          </Text>
        </TouchableOpacity>
      }
      <View style={tw`w-4/5 self-center mt-1 flex flex-row justify-end`}>
        <Text style={tw`text-right`}>
          {!userAlready ? "Already a user?" : "Need an account?"}
        </Text>
        <TouchableOpacity
          style={tw`content-end px-1`}
          onPress={() => setUserAlready(!userAlready)}
        >
          <Text style={tw`text-blue-400`}>
            {!userAlready ? "Sign in" : "Create account"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
