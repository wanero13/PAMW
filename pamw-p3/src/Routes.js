import React, {Component} from 'react';
import {Router, Stack, Scene, ActionConst} from 'react-native-router-flux';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home'
import Files from './components/Files'
import Auth from "./components/Auth";
import Biblio from "./components/Biblio";

export default class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Stack key='root'>
                    <Scene key='newUser' hideNavBar={true}>
                        <Scene key='auth' component={Auth} title='Auth' initial={true}/>
                        <Scene key='login' component={Login} title='Login' />
                        <Scene key='signup' component={Signup} title='Register'/>
                    </Scene>
                    <Scene key='authUser' hideNavBar={true} type={ActionConst.RESET}>
                        <Scene key='home' component={Home} title='Home' type={ActionConst.RESET}/>
                        <Scene key='files' component={Files} title='Files'/>
                        <Scene key='biblio' component={Biblio} title='Biblio'/>
                    </Scene>
                </Stack>
            </Router>
        );
    }
}
