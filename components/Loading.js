import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Loading({ isVisible, text }) {
    return (
        <Overlay
        isVisible = {isVisible}
        windowBackgroundColor = "rgba(0,0,0,0.5)"
        overlayBackgroundColor = "transparent"
        overlayStyle = {styles.overlay}>
            <View style = {styles.view}>
                <ActivityIndicator
                    size = "large"
                    color = "#14145c"/>
                {
                    text && <Text style = {styles.text}>{text}</Text>
                }
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay : {
        height: 100,
        width: 100,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderRadius: 5
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#14145c",
        marginTop: 10
    }
})
