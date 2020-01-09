import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'

import SignupForm from '../components/SignupForm';

export default class Signup extends Component() {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logoText}>Registration page</Text>
                <SignupForm/>
                <View style={styles.textCon}>
                    <TouchableOpacity onPress={Actions.login}>
                        <Text style={styles.footerText}>Already have an account? Sign in!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText:{
        marginVertical: 60,
        fontSize: 30,
        color: '#000000',
    },
    textCon: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 40,
    },
    footerText: {
        color: '#102030',
        fontSize: 16,
    }
});
