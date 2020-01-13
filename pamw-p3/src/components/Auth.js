import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux'
import * as SecureStore from 'expo-secure-store';

export default class Auth extends Component {
    componentDidMount() {
        this.isAuth();
    }

    isAuth = async () => {
        fetch("http://10.0.2.2:3080//login", {
            method: 'get',
            credentials: "include"
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            const code = response.status
            const res = response;
            return Promise.all([code, res]);
        }).then(([code, res]) => {
            if (code === '200') {
                this.setState({logged: true});
                console.log(data);
                console.log('inside');
                Actions.authUser();
            } else {
                this.setState({logged: false});
                Actions.login();
            }
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
