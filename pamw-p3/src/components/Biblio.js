import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Button, StyleSheet, TextInput, FlatList} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {Actions} from 'react-native-router-flux'


export default class Biblio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            biblio: [],
            selected: '',
            toadd: '',
        };
    }

    onNameChange = (value) => {
        this.setState({toadd: value});
    };

    componentDidMount = async () => {
        await this.loadBiblio();
    };

    loadBiblio = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:8080/biblio`, {
                method: 'GET',
                credentials: "include",
            });
            var data = await response.json();
            console.log(data);
            this.setState({biblio: data})
        } catch (error) {
            console.log(error);
        }
    };

    addBiblio = async (event) => {
        event.preventDefault();
        console.log('adding');
        fetch('http://10.0.2.2:8080/biblio', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                name: this.state.toadd
            })
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            const code = response.status;
            return Promise.all([code, response]);
        }).then(([code, res]) => {
            if (code === 200) {
                console.log('inside');
                this.loadBiblio()
            } else {
                console.log('Failed to add position')
            }
        })
    };

    removeBiblio = async (event) => {
        event.preventDefault();
        console.log('removing');
        fetch('http://10.0.2.2:8080/biblio', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                name: this.state.toadd
            })
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            const code = response.status;
            return Promise.all([code, response]);
        }).then(([code, res]) => {
            if (code === 200) {
                console.log('inside');
                this.loadBiblio()
            } else {
                console.log('Failed to add position')
            }
        })
    };

    render() {
        let startList = <Text>No bibliographic positions created.</Text>;
        if (this.state.biblio.length > 0) {
            startList = <FlatList
                data={this.state.biblio}
                renderItem={({item}) => (
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    </View>)}
                keyExtractor={item => item}
                extraData={this.state}
            />
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Bibliography!</Text>
                {startList}
                <TextInput style={styles.inputBox} value={this.state.todd}
                           onChangeText={this.onNameChange} placeholder="position" placeholderTextColor='#fff5e1'/>
                <TouchableOpacity style={styles.addButton} onPress={this.addBiblio.bind(this)}>
                    <Text style={styles.addText}>
                        Add
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={this.removeBiblio.bind(this)}>
                    <Text style={styles.addText}>
                        Remove
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flexGrow: 1,
        fontSize: 20,
        color: '#000000'
    },
    button: {
        width: 300,
        backgroundColor: '#efdecd',
        paddingVertical: 10,
        marginVertical: 10,
        color: '#ffffff'
    },
    buttonText: {
        fontWeight: '500',
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
    },
    addButton: {
        width: 160,
        backgroundColor: '#000000',
        borderRadius: 20,
        paddingVertical: 10,
        marginVertical: 10,
        color: '#ffffff',
        textAlign: 'center'
    },
    addText: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
    },
    inputBox: {
        width: 320,
        backgroundColor: '#102030',
        fontSize: 16,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginVertical: 12,
        height: 50,
        color: '#ffffff'
    },
});
