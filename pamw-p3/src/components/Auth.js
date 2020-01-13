import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux'
import * as SecureStore from 'expo-secure-store';

export default class Auth extends Component {
    componentDidMount() {
        this.isAuth();
    }

    isAuth = async () => {
        fetch("http://10.0.2.2:3080/login", {
            method: 'get',
            credentials: "include"
        }).then((response) => {
            return response;
        }).then((responseObject) => {
            console.log(responseObject.status);
            if (responseObject.status === 200){
                Actions.authUser();
            }
            Actions.login()
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({logged: false});
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>LOADING...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginVertical: 100,
        fontSize: 30,
        color: '#000000',
    },
});
