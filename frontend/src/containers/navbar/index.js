import React, { Component } from 'react';
import { BrowserRouter, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { BlurOn } from '@material-ui/icons';
import { Avatar, Tab, Tabs, AppBar, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import UserAvatar from '../../components/useravatar';

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
        this.state = {
            value: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event, value) => {
        this.setState({ value });
        if (this.props.auth) {
            if (value == 0) {
                this.props.history.push('/main');
            }
            else if (value == 1) {
                this.props.history.push('/recitation');
            }
            else if (value == 2) {
                this.props.history.push('/userdefined');
            };
        }
    };


    render() {
        const { auth, classes, history } = this.props;
        const { value } = this.state;
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar style={{ justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        <Typography variant="title" color="inherit" className={classes.title}>
                            SUMMER
                        </Typography>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            textColor="inherit"
                            scrollable
                            scrollButtons="auto"
                            fullWidth
                            className={classes.tabs}
                        >
                            <Tab label="首页" />
                            <Tab label="背单词" />
                            <Tab label="自定义" />
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
    }
)

const mapDispatchToProps = (dispatch) => {
    return ({

    })
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(NavBar);
