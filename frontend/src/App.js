import React, { Component } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import Main from './views/main';
import './App.css';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import Summer from './views/summer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from './containers/navbar';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#009897B',
            main: '#00796B',
            dark: '#004D40',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#f9683a',
            main: '#bf360c',
            dark: '#870000',
            contrastText: '#fff',
        }
    },
});

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<CircularProgress />} persistor={persistor} >
                    <MuiThemeProvider theme={theme}>
                        <Summer />
                    </MuiThemeProvider>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
