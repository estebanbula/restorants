import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { isEmpty, negate } from 'lodash'
import Toast from 'react-native-easy-toast'

import { validateEmail } from '../../utils/helper'
import { reaunthenticate, updateEmail } from '../../utils/actions'

export default function ChangeEmailForm({ email, setShowModal, toastRef, setReloadUser }) {

    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()){
            return
        }

        setLoading(true)
        const resultReauthenticate = await reaunthenticate(password)
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorPassword("Invalid password")
            return
        }

        const resultUpdateEmail = await updateEmail(newEmail)
        setLoading(false)

        if (!resultUpdateEmail.statusResponse) {
            setErrorEmail("This email is already in use")
            return
        }

        setReloadUser(true)
        toastRef.current.show("New email saved", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true

        if (!validateEmail(newEmail)) {
            setErrorEmail("You must enter a valid email")
            isValid = false
        }

        if ( newEmail === email ) {
            setErrorEmail("You must enter a diferent email")
            isValid = false
        }

        if(isEmpty(password)) {
            setErrorPassword("We need your password to confirm the email")
            isValid = false
        }

        return isValid
    }

    return (
        <View style = {styles.view}>
            <Input
                placeholder = "New email"
                containerStyle = {styles.input}
                defaultValue = {email}
                keyboardType = "email-address"
                onChange = {(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage = {errorEmail}
                leftIcon = {{
                    type: "material-community",
                    name: "at",
                    color: "#14145c"
                }}/>
            <Input
                placeholder = "Confirm password"
                containerStyle = {styles.input}
                defaultValue = {password}
                onChange = {(e) => setPassword(e.nativeEvent.text)}
                password = {true}
                secureTextEntry = {!showPassword}
                errorMessage = {errorPassword}
                leftIcon = {{
                    type: "material-community",
                    name: "lock-outline",
                    color: "#14145c"
                }}
                rightIcon = {
                    <Icon
                        type = "material-community"
                        name = { showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {styles.icon}
                        onPress = { () => setShowPassword(!showPassword) }
                    />
                }/>
                <Button
                    title = "Save changes"
                    containerStyle = {styles.btnContainer}
                    buttonStyle = {styles.button}
                    onPress = {onSubmit}
                    loading = {loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input:{
        marginBottom: 10
    },
    button: {
        backgroundColor: "#14145c"
    },
    btnContainer: {
        width: "95%"
    },
    icon: {
        color: "#14145c"
    }
})
