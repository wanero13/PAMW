import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Button, StyleSheet, TextInput} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Actions } from 'react-native-router-flux'


export default class Biblio extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Here will be bibliography!</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fefefe',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        color: '#000000'
    },
    button: {
        width: 260,
        backgroundColor: '#1520a6',
        borderRadius: 26,
        paddingVertical: 16,
        marginVertical: 30,
    },
    buttonText: {
        fontWeight: '500',
        color: '#fff5e1',
        fontSize: 20,
        textAlign: 'center',
    }
});
