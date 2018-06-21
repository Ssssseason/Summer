import React, { Component } from 'react';
import { BrowserRouter, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { BlurOn } from '@material-ui/icons';
import { Avatar, Tab, Tabs, AppBar, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import UserAvatar from '../components/useravatar';
import { setNavBarVal } from '../views/main/actions';

const styles = theme => ({
    title: {
        margin: 20,
        flex: 1,
    },
    tabs: {
        flex: 4,
    },
    login: {
        display: 'inline-block',
        margin: 5,
    }
});

class NavBar extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event, value) => {
        if (this.props.auth) {
            this.props.setNavBarVal(value);
            if (value == 0) {
                this.props.history.push('/main');
            }
            else if (value == 1) {
                this.props.history.push('/recitation');
            }
            else if (value == 2) {
                this.props.history.push('/exam');
            }
            else if (value == 3) {
                this.props.history.push('/userdefined');
            }
            else if (value == 4) {
                this.props.history.push('/wordbook/category');
            }
        }
    };

    render() {
        const { auth, classes, history, navBarVal, setNavBarVal } = this.props;
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar style={{ justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        <Typography variant="title" color="inherit" className={classes.title}>
                            SUMMER
                        </Typography>
                        <Tabs
                            // value={navBarVal}
                            value={false}
                            onChange={this.handleChange}
                            textColor="inherit"
                            scrollable
                            scrollButtons="auto"
                            fullWidth
                            className={classes.tabs}
                        >
                            <Tab label="首页" />
                            <Tab label="背诵" />
                            <Tab label="考核" />
                            <Tab label="自定义" />
                            <Tab label="单词书" />
                        </Tabs>
                        {auth ? <UserAvatar history={history} />
                            :
                            <div>
                                <Typography className={classes.login} variant='body1' color='inherit' component={Link} to='/login'>
                                    登录
                                </Typography>
                                <Typography className={classes.login} variant='body1' color='inherit'>{` / `}</Typography>
                                <Typography className={classes.login} variant='body1' color='inherit' component={Link} to='/register_login'>
                                    注册
                                </Typography>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => (
    {
        auth: state.persisteditems.auth,
        navBarVal: state.main.navBarVal,
    }
)

const mapDispatchToProps = (dispatch) => ({
    setNavBarVal: (navBarVal) => {
        dispatch(setNavBarVal(navBarVal));
    },
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(NavBar);
