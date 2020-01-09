import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Routes from './src/Routes'

export default class App extends Component() {
    
        render() {
        return (
            <View style={styles.container}>
                <Routes/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fefefe',
        justifyContent: 'center',
    },
});
