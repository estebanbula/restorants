import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions} from 'react-native'
import { Button, Input, Icon, Avatar, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter } from 'lodash'

import Modal from "../../components/Modal"
import { loadImageFromGallery } from '../../utils/helper'

const widthScreen = Dimensions.get("window").width

export default function AddRestorantForm({ toastRef, setLoading, navigaition }) {

    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(false)
    const [errorAddress, setErrorAddress] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [errorDescription, setErrorDescription] = useState(false)
    const [imageSelected, setImageSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationRestorant, setLocationRestorant] = useState(null)

    const addRestorant = () => {
        console.log(formData)
        console.log("Yes")
    }

    return (
        <ScrollView
            backgroundColor = "white" 
            style = {styles.viewContainer}>
            <ImageRestorant 
                imageRestorant = {imageSelected[0]}/>
            <FormAdd
                formData = {formData}
                setFormData = {setFormData}
                errorAddress = {errorAddress}
                errorEmail = {errorEmail}
                errorName = {errorName}
                errorPhone = {errorPhone}
                errorDescription = {errorDescription}
                setIsVisibleMap = {setIsVisibleMap}/>
            <UploadImage
                toastRef = {toastRef}
                imageSelected = {imageSelected}
                setImageSelected = {setImageSelected}/>
            <Button
                title = "Add restorant"
                onPress = {addRestorant}
                buttonStyle = {styles.btnAddRestorant}/>
            <MapRestorant
                isVisibleMap = {isVisibleMap}
                setIsVisibleMap = {setIsVisibleMap}
                setLocationRestorant = {setLocationRestorant}
                toastRef = {toastRef}/>
        </ScrollView>
    )
}

function MapRestorant( isVisibleMap, setIsVisibleMap, setLocationRestorant, toastRef ){
    console.log("maprestorant")
    return(
        <Modal 
            isVisible = {isVisibleMap} 
            setVisible = {isVisibleMap}>
            <Text>Map</Text>
        </Modal>
    )
}

function ImageRestorant({ imageRestorant }){
    return (
        <View
            styles = {styles.viewPhoto}>
                <Image 
                    style = {{ width: widthScreen, height: 200 }}
                    source = { 
                        imageRestorant ? { uri: imageRestorant} : require("../../assets/no-image.png")
                    }
                />
        </View>
    )
}

function UploadImage({ toastRef, imageSelected, setImageSelected }) {
    const imageSelect = async() => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.statusResponse) {
            toastRef.current.show("You didn't pick any picture.", 3000)
            return
        }
        setImageSelected([ ...imageSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Delete image",
            "This action will delete this image, you want yo continue?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Ok",
                    onPress: () => {
                        setImageSelected(
                            filter(imageSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }

    return (
        <ScrollView
            horizontal
            style = {styles.viewImage}>
                {
                    size(imageSelected) < 10 && (
                        <Icon 
                        type = "material-community"
                        name = "camera-outline"
                        color = "#7a7a7a"
                        style = {styles.containerIcon}
                        onPress = {imageSelect}/>
                    )
                }
                {
                map(imageSelected, (imageRestoran, index) => (
                    <Avatar
                        key = {index}
                        style = {styles.miniatureStyle}
                        source = {{ uri: imageRestoran }}
                        onLongPress = {() => removeImage(imageRestoran)}/>
                ))
                }
        </ScrollView>
    )
}

function FormAdd({ formData, setFormData, errorAddress, errorEmail, errorName, errorDescription, errorPhone, setIsVisibleMap }) {
    const [country, setCountry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({ ...formData, [type] : e.nativeEvent.text})
    }

    return (
        <View 
            backgroundColor = "white"
            style = {styles.viewForm}>
            <Input
                leftIcon = {
                <Icon
                    type = "material-community"
                    name = "home-city-outline"
                    iconStyle = {styles.icon}/>
                }
                placeholder = "Restorant name"
                defaultValue = {formData.name}
                onChange = {(e) => onChange(e, "name")}
                errorMessage = {errorName}/>
            <Input
                leftIcon = {
                    <Icon
                    type = "material-community"
                    name = "map-marker-outline"
                    iconStyle = {styles.icon}
                    onPress = {() => setIsVisibleMap(true)}/>
                }
                placeholder = "Restorant address"
                defaultValue = {formData.address}
                onChange = {(e) => onChange(e, "address")}
                errorMessage = {errorAddress}/>
            <Input
                leftIcon = {
                <Icon
                type = "material-community"
                name = "at"
                iconStyle = {styles.icon}/>
                }    
                keyboardType ="email-address"
                placeholder = "Restorant email"
                defaultValue = {formData.email}
                onChange = {(e) => onChange(e, "email")}
                errorMessage = {errorEmail}/>
            <View style = {styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle = {styles.countryPicker}
                    countryCode = {country} //Enviamos el country del useState
                    onSelect = {(country) => {
                        setFormData({ ...formData, "country": country.cca2, "callingCode": country.callingCode[0]}) 
                        // Concatena la información de formData pais y el codigo de llamada
                    }}/>
                <Input
                    keyboardType = "phone-pad"
                    placeholder = "Restorant WhatsApp number"
                    containerStyle = {styles.inputPhone}
                    defaultValue = {formData.phone}
                    onChange = {(e) => onChange(e, "phone")}
                    errorMessage = {errorPhone}/>
            </View>
            <Input
                placeholder = "Add a description for the restorant"
                leftIcon = {
                    <Icon
                    type = "material-community"
                    name = "comment-edit-outline"
                    iconStyle = {styles.icon}/>                    
                }
                multiline 
                containerStyle = {styles.textArea}
                defaultValue = {formData.description}
                onChange = {(e) => onChange(e, "description")}
                errorMessage = {errorDescription}/>
        </View>
    )
}

const defaultFormValues = () => {
    return {
        name: "",
        description: "",
        phone: "",
        address: "",
        country: "CO",
        callingCode: "57"
    }
}

const styles = StyleSheet.create({
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    viewContainer: {
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10,
        marginTop: 20
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    phoneView: {
        width: "80%",
        flexDirection: "row"
    },
    inputPhone: {
        width: "80%"
    },
    btnAddRestorant: {
        margin: 20,
        backgroundColor: "#14145c"
    },
    icon: {
        color: "#14145c"
    },
    viewImage: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    }
})
