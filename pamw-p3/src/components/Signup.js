import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux'

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            login: '',
            password: '',
            errors: [],
            added: null
        }
    }

    onNameChange = (value) => {
        this.setState({name: value});
    };
    onSurnameChange = (value) => {
        this.setState({surname: value});
    };
    onLoginChange = (value) => {
        this.setState({login: value});
    };
    onPasswordChange = (value) => {
        this.setState({password: value})
    };

    onSubmitRegister = async (event) => {
        event.preventDefault();

        fetch('http://10.0.2.2:3080/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                login: this.state.login,
                firstname: this.state.name,
                lastname: this.state.surname,
                password: this.state.password
            })
        }).then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                } else return response;
            }).then((responseObject) => {
                this.setState({added: true});
                console.log(responseObject);
                console.log(typeof (responseObject.username));
                Actions.login();
            }).catch((error) => {
                console.log('error: ' + error);
                this.setState({added: false});
            });
        this.setState({errors: []})

    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logoText}>Registration page</Text>
                <TextInput style={styles.inputBox} value={this.state.name}
                           onChangeText={this.onNameChange} placeholder="name" placeholderTextColor='#fff5e1'/>
                <TextInput style={styles.inputBox} value={this.state.surname}
                           onChangeText={this.onSurnameChange} placeholder="surname" placeholderTextColor='#fff5e1'/>
                <TextInput style={styles.inputBox} value={this.state.login}
                           onChangeText={this.onLoginChange} placeholder="login" placeholderTextColor='#fff5e1'/>
                <TextInput style={styles.inputBox} value={this.state.password}
                           onChangeText={this.onPasswordChange} placeholder="password" placeholderTextColor='#fff5e1'
                           secureTextEntry={true}/>
                <TouchableOpacity style={styles.button} onPress={this.onSubmitRegister.bind(this)}>
                    <Text style={styles.buttonText}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.textCon}>
                    <TouchableOpacity onPress={Actions.pop}>
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
    logoText: {
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
    },
    inputBox: {
        width: 320,
        backgroundColor: '#102030',
        fontSize: 16,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginVertical: 8,
        height: 50,
        color: '#ffffff'
    },
    button: {
        width: 320,
        backgroundColor: '#1520a6',
        borderRadius: 20,
        paddingVertical: 12,
        marginVertical: 8,
    },
    buttonText: {
        fontWeight: '500',
        color: '#fff5e1',
        fontSize: 20,
        textAlign: 'center',
    }
});
