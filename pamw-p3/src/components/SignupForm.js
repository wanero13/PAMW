import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default class SignupForm extends Component() {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox} placeholder="Name" placeholderTextColor='#fff5e1'/>
                <TextInput style={styles.inputBox} placeholder="Surname" placeholderTextColor='#fff5e1'/>
                <TextInput style={styles.inputBox} placeholder="Login" placeholderTextColor='#fff5e1'/>
                <TextInput style={styles.inputBox} placeholder="Password" placeholderTextColor='#fff5e1'
                           secureTextEntry={true}/>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Create account</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        width: 320,
        backgroundColor: '#102030',
        fontSize: 16,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginVertical:8,
        height: 50,
    },
    button: {
        width: 320,
        backgroundColor: '#1520a6',
        borderRadius: 20,
        paddingVertical: 12,
        marginVertical:8,
    },
    buttonText: {
        fontWeight: '500',
        color: '#fff5e1',
        fontSize: 20,
        textAlign: 'center',

    }
});
