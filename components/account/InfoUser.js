import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'

import { updateProfile, uploadImage } from '../../utils/actions'
import { loadImageFromGallery } from '../../utils/helper'

export default function InfoUser({ user, setLoading, setLoadingText }) {

    const [photoUrl, setPhotoUrl] = useState(user.photoURL)
    
    const changePhoto = async() => {
        const result = await loadImageFromGallery([1, 1])
        if (!result.statusResponse) {
            return
        }
        setLoadingText("Updating profile picture")
        setLoading(true)
        const resultUplaodImage = await uploadImage(result.image, "avatars", user.uid)
        if (!resultUplaodImage.statusResponse){
            setLoading(false)
            Alert.alert("The information can't be displayed")
            return
        }

        const resultUpdateProfile = await updateProfile({ photoURL: resultUplaodImage.url })
        setLoading(false)

        if (resultUpdateProfile.statusResponse) {
            setPhotoUrl(resultUplaodImage.url)
        }else{
                Alert.alert("The information can't be displayed")
            }
}

    return (
        <View style = {styles.container}>
            <Avatar
                rounded = {true}
                size = "large"
                containerStyle = {styles.avatar}
                onPress = {changePhoto}
                source = {
                    photoUrl ? { uri: photoUrl } : require("../../assets/avatar.png")
                }
            />
            <View style = {styles.InfoUser}>
                <Text style = {styles.displayName}> 
                {
                    user.displayName ? user.displayName : "Anonymous"
                }
                </Text>
                <Text>{ user.email }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        paddingVertical: 30
    },
    avatar: {
        marginHorizontal: 10
    },
    infoUser: {
        marginLeft: 20
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5,
        color: "#14145c"
    }
})
