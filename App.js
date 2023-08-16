import store from "./store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import CalculationScreen from "./screens/CalculationScreen";
import LoginScreen from "./screens/LoginScreen";
import * as SplashScreen from "expo-splash-screen";
import LocationScreen from "./screens/LocationScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  //SplashScreen.preventAutoHideAsync();
  //setTimeout(SplashScreen.hideAsync, 2000);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            {/*<Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
  />*/}
            {/* <Stack.Screen
              name="LocationScreen"
              component={LocationScreen}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CalculationScreen"
              component={CalculationScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
