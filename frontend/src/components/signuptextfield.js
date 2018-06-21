import React, { Component } from 'react';
import { Button, Grid, TextField, Typography, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { register, setHasFinished } from '../views/login/actions';

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

let emailRegex = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");
let errorUNRegex = new RegExp("username$");
let errorEMRegex = new RegExp("email$");

class SignupTextField extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            isDialogOpen: false,
            dialogContent: undefined,
        };
    }

    render() {
        const { username, email, password, isDialogOpen, dialogContent } = this.state;
        const { classes, register, hasFinished, registerMsg, setHasFinished, error } = this.props;
        return (
            <Grid container justify='center' className={classes.container}>
                <TextField
                    id="userName"
                    label="用户名"
                    helperText="六字节以上"
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
                    id="email"
                    label="邮箱"
                    helperText="六字节以上"
                    margin="dense"
                    fullWidth
                    onChange={(event) => {
                        event.preventDefault();
                        this.setState({
                            email: event.target.value,
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
                        if (username.length <= 6) {
                            this.setState({
                                isDialogOpen: true,
                                dialogContent: "用户名长度必须大于6字节",
                            })
                        }
                        else if(username.length > 50){
                            this.setState({
                                isDialogOpen: true,
                                dialogContent: "用户名长度必须小于50字节",
                            })
                        }
                        else if (password.length <= 6) {
                            this.setState({
                                isDialogOpen: true,
                                dialogContent: "密码长度必须大于6字节",
                            })
                        }
                        else if(password.length > 50){
                            this.setState({
                                isDialogOpen: true,
                                dialogContent: "密码长度必须小于50字节",
                            })
                        }
                        else if (!(emailRegex.test(email))) {
                            this.setState({
                                isDialogOpen: true,
                                dialogContent: "邮箱格式错误",
                            })
                        }
                        else {
                            register(username, email, password);
                        }
                    }}>
                    注册
                </Button>
                <Typography variant='body1' component={Link}
                    to='/login'
                    color="inherit" align='center'>
                    已有账户？去登录
                </Typography>
                <Dialog
                    open={isDialogOpen}
                    onClose={(event) => {
                        event.preventDefault();
                        this.setState({
                            isDialogOpen: false,
                        });
                    }}
                    fullWidth
                    aria-labelledby="login_alert-dialog-title"
                    aria-describedby="login_alert-dialog-description"
                >
                    <DialogTitle id="login_alert-dialog-title">注册</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="login_alert-dialog-description">
                            {dialogContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(event) => {
                            event.preventDefault();
                            this.setState({
                                isDialogOpen: false,
                            })
                        }} color="primary">
                            确定
                         </Button>
                    </DialogActions>
                </Dialog>
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
                    <DialogTitle id="login_alert-dialog-title">注册</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="login_alert-dialog-description">
                            {!error? "成功":
                                errorUNRegex.test(error.response.data.error) ? "用户名已被使用" : 
                            errorEMRegex.test(error.response.data.error)?"邮箱已被使用": error.response.data.error}
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
    register: (username, email, password) => {
        dispatch(register(username, email, password));
    },
    setHasFinished: (hasFinished) => {
        dispatch(setHasFinished(hasFinished));
    },
})

SignupTextField.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SignupTextField);
