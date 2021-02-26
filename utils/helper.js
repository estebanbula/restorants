import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const loadImageFromGallery = async(array) => {
    const response = { statusResponse: false, image: null }
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)

    if(resultPermissions.response === "denied") {
        Alert.alert("The App doesn't have permission to access to your gallery")
        return response
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array
    })

    if(result.cancelled) {
        return response
    }

    response.statusResponse = true
    response.image = result.uri
    return response
}

export const fileToBlob = async(path) => {
    const file = await fetch(path)
    const blop = await file.blob()
    return blop
}