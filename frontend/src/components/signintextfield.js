import React, { Component } from 'react';
import { Button, Grid, TextField, Typography, Dialog, DialogActions, DialogTitle, DialogContentText, DialogContent } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { login } from '../views/login/actions';
import { setHasFinished } from '../views/login/actions';

const styles = theme => ({
    item: {
        marginTop: 15,
        marginBottom: 15,
    },
    button: {
        marginTop: 30,
        marginBottom: 39,
    },
    container: {
        marginTop: 20,
        marginBottom: 20,
    }
});

class SigninTextField extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
    }

    render() {
        const { username, email, password } = this.state;
        const { classes, login, hasFinished, setHasFinished } = this.props;
        return (
            <Grid container justify='center' className={classes.container}>
                <TextField
                    id="userName"
                    label="用户名"
                    margin="dense"
                    fullWidth
                    className={classes.item}
                    onChange={(event) => {
                        event.preventDefault();
                        this.setState({
                            username: event.target.value,
                        })
                    }}
                />
                <TextField
                    id="password"
                    label="密码"
                    type="password"
                    autoComplete="current-password"
                    margin="dense"
                    fullWidth
                    className={classes.item}
                    onChange={(event) => {
                        event.preventDefault();
                        this.setState({
                            password: event.target.value,
                        })
                    }}
                />
                <Button variant='raised' fullWidth size='large' color='primary'
                    className={classes.button}
                    onClick={(event) => {
                        event.preventDefault();
                        login(username, password);
                    }}>
                    登录
                </Button>
                <Typography variant='body1' component={Link}
                    to='/register_login'
                    color="inherit" align='center'>
                    还没有账户？去注册
                </Typography>
                <Dialog
                    open={hasFinished}
                    onClose={(event) => {
                        event.preventDefault();
                        setHasFinished(false);
                    }}
                    fullWidth
                    aria-labelledby="login_alert-dialog-title"
                    aria-describedby="login_alert-dialog-description"
                >
                    <DialogTitle id="login_alert-dialog-title">登录</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="login_alert-dialog-description">
                            用户名或密码错误
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(event) => {
                            event.preventDefault();
                            setHasFinished(false);
                        }} color="primary">
                            确定
                         </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );

    }
}

const mapStateToProps = (state) => ({
    hasFinished: state.login.hasFinished,
    error: state.login.error,

});

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => {
        dispatch(login(username, password));
    },
    setHasFinished: (hasFinished) => {
        dispatch(setHasFinished(hasFinished));
    },
})

SigninTextField.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SigninTextField);
