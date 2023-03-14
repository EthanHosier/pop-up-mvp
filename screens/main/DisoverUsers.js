import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import StoryCard from '../../components/StoryCard';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const DiscoverUsers = () => {
  const [searching, setSearching] = useState(false)
  return (
    <SafeAreaView className="bg-secondary">



      {/*
      <View className="rounded-b-3xl">
        <View className="px-6 flex-row justify-between items-end">
          <Text className="text-primary font-bold text-2xl">Friendzy</Text>
          <TouchableOpacity className="rounded-full border border-gray-300 aspect-square items-center justify-center p-2">
            <FontAwesome name="bell-o" size={24} color="#4C214C" />
          </TouchableOpacity>
        </View>
        <View className="h-20 mt-4">
          <ScrollView
            horizontal
            className="px-6"
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity>
              <View className="relative items-center justify-center mr-3" style={{ padding: 2 }}>
                <Image source={require("../../assets/portable-profile/face2.png")} className="aspect-square h-14 rounded-full" />
                <View className="absolute bg-tertiary rounded-full border border-secondary" style={{ bottom: 1, right: 1 }}>
                  <Entypo name="plus" size={20} color="white" />
                </View>
              </View>
            </TouchableOpacity>
            {[... new Array(10)].map((e, i) => {
              return (
                <TouchableOpacity>
                  <View key={i} className="rounded-full items-center justify-center border border-tertiary border-2 mr-3" style={{ padding: 2 }}>
                    <Image source={require("../../assets/portable-profile/face.jpeg")} className="aspect-square h-14 rounded-full" />
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      </View>
      * */}


      {/*CHANGE TO FLATLIST ONCE HAVE ACTUAL DATA */}
      
        <View className="h-24 items-center justify-center relative px-6">
          {/*<BarIndicator color="#4C214C" count={5} />*/}
          <View className="aspect-square h-16 rounded-full bg-gray-200 bottom-3 absolute z-10"/>
          <TouchableOpacity 
          className="rounded-full bg-gray-100 aspect-square h-16 items-center justify-center shadow-md  absolute z-10"
          activeOpacity={0.5}
          onPress={() => setSearching(s => !s)}
          >
            <Ionicons name="power" size={32} color={searching? "#E29BD7":"#d9d9d9"} style={{marginLeft:2, marginTop:2 , textShadowColor:"red"}} />
          </TouchableOpacity>
          {searching && 
          <WaveIndicator 
          color="#E29BD7" 
          size={90} 
          style={{marginTop:2}}
          waveFactor={0.8}
          />
          }
        </View>

        <View className="bg-white rounded-3xl px-6">
        <Text className="font-bold pt-2">Nearby Users</Text>
        <FlatList 
        data={[... new Array(16)]}
        renderItem={({item,index}) => 
        (<View className="m-1"><StoryCard id={index}/></View>
  )}
        keyExtractor={(_,index) => index}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        
        />
        
         </View>
      




    </SafeAreaView>
  )
}

export default DiscoverUsers