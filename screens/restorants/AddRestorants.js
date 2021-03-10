import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast'

import AddRestorantForm from '../../components/restorants/AddRestorantForm'
import Loading from '../../components/Loading'

export default function AddRestorants({ navigation }) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(null)

    return (
        <KeyboardAwareScrollView>
            <AddRestorantForm
                toastRef = {toastRef}
                setLoading = {setLoading}
                navigaition = {navigation}/>
                <Loading 
                    isVisible = {loading}/>
                <Toast 
                    ref = {toastRef}
                    position = "center"
                    opacity = {0.9} />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
