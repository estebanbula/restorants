import { identity, size } from 'lodash'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helper'
import { registerUser } from '../../utils/actions'
import Loading from '../Loading'

export default function RegisterForm() {
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setformData] = useState(defaultFormValues())

    const [errorEmail, seterrorEmail] = useState("")
    const [errorPassword, seterrorPassword] = useState("")
    const [errorConfirm, seterrorConfirm] = useState("")

    const [loading, setLoading] = useState(false)

    const onChange = (e, type) => {
        setformData({ ...formData, [type]: e.nativeEvent.text })
    }

    const doRegisterUser = async() => {
        if (!validateData()){
            return;
        }

        setLoading(true)
        const result = await registerUser(formData.email, formData.password)
        setLoading(false)

        if (!result.statusResponse)
        {
            seterrorEmail(result.error)
            return
        }

        navigation.navigate("account")
    }

    const validateData = () => {
        seterrorConfirm("")
        seterrorEmail("")
        seterrorPassword("")
        let isValid = true 

        if(!validateEmail(formData.email)){
            seterrorEmail("You must enter a valid email")
            isValid = false
        }

        if (size(formData.password) < 8){
            seterrorPassword("Your password must have more than 8 caracters")
            isValid = false
        }

        if (size(formData.confirm) < 8){
            seterrorConfirm("The passwords doesn't match")
            isValid = false
        }

        if( formData.password !== formData.confirm){
            seterrorPassword("The passwords doesn't match")
            seterrorConfirm("The passwords doesn't match")
            isValid = false
        }

        return isValid
    }

    return (
        <View 
        style = {styles.form}
        backgroundColor = "#FFFFFF">
            <Input
                defaultValue = {formData.email}
                errorMessage = {errorEmail}
                containerStyle = {styles.input}
                keyboardType = "email-address"
                label = "Your email address:"
                leftIcon = {
                    <Icon
                        type = "material-community"
                        name = "email-outline" 
                        iconStyle = {styles.icon}
                    />
                }
                placeholder = "Email"
                onChange = {(e) => onChange(e, "email")}/>
            <Input
                defaultValue = {formData.password}
                errorMessage = {errorPassword}
                containerStyle = {styles.input}
                label = "Password:"
                placeholder = "Password"
                password = {true}
                secureTextEntry = {!showPassword}
                leftIcon = {
                    <Icon
                        type = "material-community"
                        name = "lock-outline" 
                        iconStyle = {styles.icon}
                    />}
                rightIcon = {
                    <Icon
                        type = "material-community"
                        name = { showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {styles.icon}
                        onPress = { () => setShowPassword(!showPassword) }
                    />
                }
                onChange = {(e) => onChange(e, "password")}/>
            <Input
                defaultValue = {formData.confirm}
                errorMessage = {errorConfirm}
                containerStyle = {styles.input}
                label = "Confirm password:"
                placeholder = "Confirm password"
                password = {true}
                secureTextEntry = {!showPassword}
                leftIcon = {
                    <Icon
                        type = "material-community"
                        name = "lock-outline" 
                        iconStyle = {styles.icon}
                    />}
                rightIcon = {
                    <Icon
                        type = "material-community"
                        name = { showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {styles.icon}
                        onPress = { () => setShowPassword(!showPassword) }
                    />
                }
                onChange = {(e) => onChange(e, "confirm")}/>
            <Button
                title = "Create account"
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.button}
                onPress = {() => doRegisterUser()}/>
            <Loading
                isVisible = {loading}
                />
        </View>
    )
}

const defaultFormValues = () => {
    return {
        email: "", password: "", confirm: "" 
    }
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    button: {
        backgroundColor: "#14145c",
        marginVertical: 20
    },
    icon: {
        color: "#14145c"
    }
})
