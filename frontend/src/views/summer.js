
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, withRouter, Redirect, Switch } from 'react-router-dom';
import Main from './main';
import { CircularProgress, AppBar } from '@material-ui/core';
import { connect } from 'react-redux';
import NavBar from '../containers/navbar';
import Login from '../views/login';
import Recitation from '../views/recitation';
import Setting from '../views/setting';
import WordBookCategory from '../views/wordbookcategory';
import Exam from '../views/exam';
import Userdefined from '../views/userdefined';


class Summer extends React.Component {
    render() {
        const { auth } = this.props;
        return (
            <BrowserRouter>
                <div style={{
                    backgroundColor: '#f0f0ee',
                    minHeight: '100vh', // TODO: tmp solution for background color 
                }}>
                    <Route path={'/'} component={NavBar} />
                    {!auth ?
                        <Switch>
                            <Route path={'/login'} render={() => (<Login type='login' />)} />
                            <Route path={'/register_login'} render={() => (<Login type='register_login' />)} />
                            <Redirect to={'/login'} />
                        </Switch>
                        :
                        <Switch>
                            <Route path={'/login'} render={() => (<Login type='login' />)} />
                            <Route path={'/register_login'} render={() => (<Login type='register_login' />)} />
                            <Route path={'/main'} component={Main} />
                            <Route path={'/recitation'} component={Recitation} />
                            <Route path={'/exam'} component={Exam} />
                            <Route path={'/userdefined'} component={Userdefined}/>
                            <Route path={'/setting'} component={Setting}/>
                            <Route path={'/wordbook/category'} component={WordBookCategory}/>
                            <Redirect to={'/main'} />
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
