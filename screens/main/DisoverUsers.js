import { View, Text, SafeAreaView, TouchableOpacity, NativeModules, NativeEventEmitter } from 'react-native'
import React, { useState, useEffect } from 'react'
import StoryCard from '../../components/StoryCard';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons';

const { NearbyMessages } = NativeModules;
const NearbyMessagesEvents = new NativeEventEmitter(NearbyMessages);

import {
  WaveIndicator,
} from 'react-native-indicators';
import useAuth from '../../hooks/useAuth';
import useFirestore from '../../hooks/useFirestore';

const DiscoverUsers = () => {
  const { user, signout } = useAuth();
  const { getUserData } = useFirestore();
  const [searching, setSearching] = useState(false)
  const [detectedUsers, setDetectedUsers] = useState([])



  useEffect(() => {
    NearbyMessagesEvents.addListener("AdvertisingStatus", console.log)
    NearbyMessagesEvents.addListener("UserDetected", handleUserDetected)
    NearbyMessagesEvents.addListener("ListeningStatus", console.log)

    return () => {
      NearbyMessagesEvents.removeAllListeners("BleStatus")
      NearbyMessagesEvents.removeAllListeners("UserDetected")
      NearbyMessagesEvents.removeAllListeners("ListeningStatus")
    }

  }, [])

  const startAdvertisingAndListening = () => {
    NearbyMessages.startAdvertising(user.uid);
    NearbyMessages.startListening();
  }

  const stopAdvertisingAndListening = () => {
    NearbyMessages.stopAdvertising();
    NearbyMessages.stopListening();
  }

  const handlePowerButtonPressed = () => {
    if (searching) {
      stopAdvertisingAndListening();
      setSearching(false);
      return;
    }

    startAdvertisingAndListening();
    setSearching(true);
  }

  const handleUserDetected = async (id) => {
    const data = await getUserData(id);
    console.log(data);
    setDetectedUsers(old => [...old, data])
  }

  return (
    <SafeAreaView className="bg-secondary">

      <Text onPress={signout}>signout</Text>

      <View className="h-24 items-center justify-center relative px-6">
        {/*<BarIndicator color="#4C214C" count={5} />*/}
        <View className="aspect-square h-16 rounded-full bg-gray-200 bottom-3 absolute z-10" />
        <TouchableOpacity
          className="rounded-full bg-gray-100 aspect-square h-16 items-center justify-center shadow-md  absolute z-10"
          activeOpacity={0.5}
          onPress={handlePowerButtonPressed}
        >
          <Ionicons name="power" size={32} color={searching ? "#E29BD7" : "#d9d9d9"} style={{ marginLeft: 2, marginTop: 2, textShadowColor: "red" }} />
        </TouchableOpacity>
        {searching &&
          <WaveIndicator
            color="#E29BD7"
            size={90}
            style={{ marginTop: 2 }}
            waveFactor={0.8}
          />
        }
      </View>

      <View className="bg-white rounded-3xl px-6 h-full">

        {/* 
       <FlatList

          ListHeaderComponent={<Text className="font-bold pt-2 ml-1">Nearby Users</Text>
          }

          data={[... new Array(1)]}
          renderItem={({ item, index }) =>
          (<View className="m-1"><StoryCard id={index} /></View>
          )}
          keyExtractor={(_, index) => index}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white", borderRadius: 10 }}
        />
      */}
        <FlatList
        ListHeaderComponent={<Text className="font-bold pt-2 ml-1">Nearby Users</Text>}
        data={detectedUsers}
          renderItem={({ item, index }) => (
            <View className="m-1"><StoryCard id={index} name={item.name} gender={item.gender} picUrl={item.picUrl} /></View>
          )}
          keyExtractor={(_, index) => index}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white", borderRadius: 10 }}

        />
      </View>





    </SafeAreaView>
  )
}

export default DiscoverUsers