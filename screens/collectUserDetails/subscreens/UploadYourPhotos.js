import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UploadYourPhotos = ({image,setImage}) => {

    const handleImagePicker = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 800,
            cropping: true,
        }).then(image => {
            setImage(image)
            console.log(image)
        }).catch(() => { });
    }
    return (
        <View className="w-full items-center px-8">
            <Text className="font-bold text-2xl text-primary">Upload your photos</Text>

            <View className="bg-white rounded-lg w-5/6 h-1/2 mt-8 relative items-center">

                {JSON.stringify(image) === '{}' ?

                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-tertiary flex-row items-center justify-center rounded-lg p-2 w-16 absolute bottom-5"
                        onPress={handleImagePicker}
                    >
                        <Ionicons name={"add"} size={16} color="white" />
                        <Text className="text-white">Add</Text>
                    </TouchableOpacity>
                    :
                    <>
                        <Image source={{ uri: image.path }} className="rounded-lg w-full h-full" />

                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="bg-gray-300/90 w-32 absolute bottom-5 items-center justify-center flex-row p-2 rounded-lg"
                            onPress={handleImagePicker}
                        >
                            <Ionicons name={"camera"} size={16} color="white" style={{ marginRight: 4 }} />
                            <Text className="text-white">Change Photo</Text>
                        </TouchableOpacity>
                    </>

                }
            </View>

        </View>
    )
}

export default UploadYourPhotos