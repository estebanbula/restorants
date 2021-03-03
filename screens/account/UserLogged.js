import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

import { closeSession, getCurrentUser } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import AccountOptions from '../../components/account/AccountOptions'

export default function UserLogged() {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
    }, [reloadUser])

    return (
        <View style = {styles.container}>
            {
                user && (
                <View>
                    <InfoUser 
                        user = {user} 
                        setLoading = {setLoading} 
                        setLoadingText = {setLoadingText}
                    />
                    <AccountOptions
                        user = {true}
                        toastRef = {toastRef}
                        setReloadUser = {setReloadUser}/>
                </View>
                )
            }
            <Button
                title = "Log out"
                buttonStyle = {styles.button}
                titleStyle = {styles.closeSessionButton}
                onPress = {() => {
                    closeSession()
                    navigation.navigate("restorants")
                }}
            />
            <Toast ref = {toastRef} position = "center" opacity = {0.9}/>
            <Loading isVisible = {loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFF",
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: "#14145c",
        borderBottomColor: "#14145c",
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    container: {
        flex: 1,
        minHeight: "100%",
        backgroundColor: "#FFFFFF"
    },
    closeSessionButton: {
        color: "#14145c"
    }
})
