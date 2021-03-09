import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { reaunthenticate, updateEmail, updatePassword } from '../../utils/actions'

export default function ChangePasswordForm({ toastRef, setShowModal }) {

    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()){
            return
        }

        setLoading(true)
        const resultReauthenticate = await reaunthenticate(currentPassword)
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorPassword("Invalid password")
            return
        }

        const resultUpdatePassword = await updatePassword(newPassword)
        setLoading(false)

        if (!resultUpdatePassword.statusResponse) {
            setErrorNewPassword("Error saving the information, please try again later")
            return
        }

        toastRef.current.show("New password saved", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true

        if (isEmpty(currentPassword)) {
            setErrorCurrentPassword("You must enter your current password")
            isValid = false
        }

        if ( newPassword !== confirmPassword ) {
            setErrorNewPassword("The passwords doesn't match, please check")
            setErrorConfirmPassword("The password doesn't match, please check")
            isValid = false
        }

        if(size(newPassword) < 8) {
            setErrorNewPassword("We need your password must have at least 8 caracters")
            isValid = false
        }

        if(size(confirmPassword) < 8) {
            setErrorConfirmPassword("You new password must have at least 8 caracters")
            isValid = false
        }

        if(newPassword === currentPassword) {
            setErrorConfirmPassword("You must enter a password diferent to your current password")
            setErrorCurrentPassword("You must enter a password diferent to your current password")
            setErrorNewPassword("You must enter a password diferent to your current password")
            isValid = false
        }

        return isValid
    }

    return (
        <View style = {styles.view}>
            <Input
                placeholder = "Type your current password"
                containerStyle = {styles.input}
                defaultValue = {currentPassword}
                onChange = {(e) => setCurrentPassword(e.nativeEvent.text)}
                password = {true}
                secureTextEntry = {!showPassword}
                errorMessage = {errorCurrentPassword}
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
            <Input
                placeholder = "Type your new password"
                containerStyle = {styles.input}
                defaultValue = {newPassword}
                onChange = {(e) => setNewPassword(e.nativeEvent.text)}
                password = {true}
                secureTextEntry = {!showPassword}
                errorMessage = {errorNewPassword}
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
            <Input
                placeholder = "Confirm your new password"
                containerStyle = {styles.input}
                defaultValue = {confirmPassword}
                onChange = {(e) => setConfirmPassword(e.nativeEvent.text)}
                password = {true}
                secureTextEntry = {!showPassword}
                errorMessage = {errorConfirmPassword}
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
