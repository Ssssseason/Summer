import React, { Component } from 'react';
import { Button, Grid, TextField, Typography, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { register } from '../views/login/actions';

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

class SignupTextField extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            isDiaglogOpen: false,
        };
    }

    render() {
        const { username, email, password, isDiaglogOpen } = this.state;
        const { classes, register } = this.props;
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
                        console.log("username", username, "email", email, "pw", password);
                        if (username.length < 6 || email.length < 6) {
                            this.setState({
                                isDiaglogOpen: true,
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
                    open={isDiaglogOpen}
                    onClose={(event) => {
                        event.preventDefault();
                        this.setState({
                            isDiaglogOpen: false,
                        });
                    }}
                    fullWidth
                    aria-labelledby="login_alert-dialog-title"
                    aria-describedby="login_alert-dialog-description"
                >
                    <DialogTitle id="login_alert-dialog-title">注册</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="login_alert-dialog-description">
                            用户名和邮箱长度必须大于等于六字节
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(event) => {
                            event.preventDefault();
                            this.setState({
                                isDiaglogOpen: false,
                            })
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

});

const mapDispatchToProps = (dispatch) => ({
    register: (username, email, password) => {
        dispatch(register(username, email, password));
    }
})

SignupTextField.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SignupTextField);
