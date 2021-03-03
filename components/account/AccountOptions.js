import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements';
import { map } from 'lodash';

import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';

export default function AccountOptions({user, toasRef, setReloadUser}) {

    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const generateOptions = () => {
        return [
            {
                title: "Change name and lastname",
                iconNameLeft: "account-circle-outline",
                iconColorLeft: "#14145c",
                iconNameRight: "chevron-right",
                iconColorRight: "#14145c",
                onPress: () => selectedComponent("displayName")
            },
            {
                title: "Change email",
                iconNameLeft: "at",
                iconColorLeft: "#14145c",
                iconNameRight: "chevron-right",
                iconColorRight: "#14145c",
                onPress: () => selectedComponent("email")
            },
            {
                title: "Change password",
                iconNameLeft: "account-circle-outlien",
                iconColorLeft: "#14145c",
                iconNameRight: "chevron-right",
                iconColorRight: "#14145c",
                onPress: () => selectedComponent("password")
            }
        ]
    }

    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName = {user.displayName}
                        setShowModal = {setShowModal}
                        toasRef = {toasRef}
                        setReloadUser = {setReloadUser}/>
                )
                break;
            case "email":
                setRenderComponent(
                <Text>email</Text>
                )
                break;
            case "password":
                setRenderComponent(
                <Text>password</Text>
                )
                break;
        }
        setShowModal(true)
    }

    const menuOptions = generateOptions();

    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                    key = {index}
                    style = {styles.menuItem}
                    onPress = {menu.onPress}>
                        <Icon
                        type = "material-community"
                        name = {menu.iconNameLeft}
                        color = {menu.iconColorLeft}/>
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                        type = "material-community"
                        name = {menu.iconNameRight}
                        color = {menu.iconNameRight}/>
                    </ListItem>
                ))
            }
            <Modal
                isVisible = {showModal}
                setVisible = {setShowModal}>
                    {
                        renderComponent
                    }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#14145c"
    }
})
