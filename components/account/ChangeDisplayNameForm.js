import { isEmpty, negate } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

import { updateProfile } from '../../utils/actions'

export default function ChangeDisplayNameForm({ displayName, setShowModal, toasRef, setReloadUser}) {
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()){
            return
        }

        setLoading(true)
        const result = await updateProfile({displayName: newDisplayName})
        setLoading(false)

        if (!result.statusResponse) {
            setError("The update failed")
            return
        }

        setReloadUser(true)
        toasRef.current.show("Information saved", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setError(null)

        if (isEmpty(newDisplayName)) {
            setError("You must enter a name and a lastname")
            return false
        }

        if ( newDisplayName === displayName ) {
            setError("You must enter a diferent name or lastname")
            return false
        }

        return true
    }

    return (
        <View style = {styles.view}>
            <Input
                placeholder = "Name and lastname"
                containerStyle = {styles.input}
                defaultValue = {displayName}
                onChange = {(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage = {error}
                rightIcon = {{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#14145c"
                }}></Input>
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
    }
})
