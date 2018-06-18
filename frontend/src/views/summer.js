
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, withRouter, Redirect, Switch } from 'react-router-dom';
import Main from './main';
import { CircularProgress, AppBar } from '@material-ui/core';
import { connect } from 'react-redux';
import NavBar from '../containers/navbar';
import Login from '../views/login';


class Summer extends React.Component {
    render() {
        const { auth } = this.props;
        return (
            <BrowserRouter>
                <div>
                    <Route path={'/'} component={NavBar} />
                    {!auth ?
                        <Switch>
                            <Route path={'/login'} render={() => (<Login type='login' />)} />
                            <Route path={'/register_login'} render={() => (<Login type='register_login' />)} />
                            <Redirect to={`/login`} />
                        </Switch>
                        :
                        <Switch>
                            <Route path={'/login'} render={() => (<Login type='login' />)} />
                            <Route path={'/register_login'} render={() => (<Login type='register_login' />)} />
                            <Route path={'/main'} component={Main} />
                        </Switch>
                    }
                </div>
            </BrowserRouter>
        )
    }
}


const mapStateToProps = (state) => {
    return ({
        auth: state.persisteditems.auth,
    })
};

const mapDispatchToProps = (dispatch) => {
    return ({

    })
};

export default connect(mapStateToProps, mapDispatchToProps)(Summer);
