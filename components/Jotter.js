/* const [userData, setUserData] = useState({
    userLocation: '',
    userDestination: '',
  });
  const [journeyInfo, setJourneyInfo] = useState(
    {
      miles: '',
      mpg: 50,
      petrolPrice: 185.77,
      dieselPrice: 193.26,
      gtoLConvers: 4.54609,
      journeyCost: ''
    }
  );

  function handleChange(name, value) {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }

  function handlePress() {

    var axios = require('axios');
    
    var config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location.latitude}%2C${location.longitude}&destinations=${userData.userDestination}&units=imperial&key=AIzaSyC3Q3IO-FM9ptZ3sm2y-Bqe32USexf9RKY`,
      headers: { }
    };

    console.log(config.url)
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
      setJourneyInfo((prevJourneyInfo) => ({
        ...prevJourneyInfo,
        miles: response.data.rows[0].elements[0].distance.value/(1.60934*1e3)
      }))}).then(() => {
      const cost = (journeyInfo.miles/journeyInfo.mpg*journeyInfo.gtoLConvers*journeyInfo.petrolPrice/100).toFixed(2)
      setJourneyInfo((prevJourneyInfo) => ({
        ...prevJourneyInfo,
        journeyCost: cost
      }))})
    .catch(function (error) {
      console.log(error);
    });
  }
    const [location, setLocation] = useState({
      latitude: '',
      longitude: '',
    });
    const [errorMsg, setErrorMsg] = useState('');
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }*/

//    return (
/*<SafeAreaView style={tw`bg-indigo-50 flex-1 items-center`}>
          <TextInput
            style={tw`p-5 bg-indigo-100 w-80 mb-5`}
            onChangeText={(e) => handleChange('userDestination', e)}
            value={userData.userDestination}
            placeholder="Where are you heading?"
          />
          <Button title="Get Mileage" onPress={handlePress}/>
    
          <Text>Journey Cost: £{journeyInfo.journeyCost}</Text>
          <Text>{location ? location.latitude : 'Hello'} {location? location.longitude : "world"}</Text>
    
          <MapView initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }} style={tw`w-full h-70`}/>
    
          <View style={tw`bg-blue-100 w-full flex-row py-10 content-end mt-auto justify-center`}>
            <View style={tw`px-10`}>
            <Text>Home</Text>
            </View>
            <View style={tw`px-10`}>
            <Text>Account</Text>
            </View>
          </View>
        </SafeAreaView>*/

import { Animated, View, Text, TouchableOpacity, Easing, Switch } from "react-native";
import React, { useRef } from 'react';
import tw from "twrnc";

const Jotter = () => {

  const height = useRef(new Animated.Value(0)).current

  const handlePress = () => {
    Animated.timing(
      height,
      {
        toValue: 50,
        duration: 1000,
        easing: Easing.exp,
        useNativeDriver: true
      },
    ).start();
    console.log(height)
  }
  const handlePress2 = () => {
    Animated.timing(
      height,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      },
    ).start();
    console.log(height)
  }

  return (
    <View>
    <Animated.View style={[tw`bg-sky-300 p-5 transform translate-x-5`, {transform: [{translateY: height}]}]}>
      <Text>Jotter</Text>
      <Switch value={true}></Switch>
    </Animated.View>
      <TouchableOpacity onPress={handlePress} style={tw`bg-white rounded-full w-1/5 m-5`}><Text style={tw`text-center`}>Show</Text></TouchableOpacity>
      <TouchableOpacity onPress={handlePress2} style={tw`bg-white rounded-full w-1/5 m-5`}><Text style={tw`text-center`}>Hide</Text></TouchableOpacity>
    </View>
  );
};

export default Jotter;
