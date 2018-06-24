import React, { Component } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SigninTextField from '../../components/signintextfield';
import {Redirect} from 'react-router-dom';
import SignupTextField from '../../components/signuptextfield';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        // margin: 100,
    },
    paper: {
        marginTop: 50,
        marginBottom: 30,
        padding: 40,
        maxWidth: 400,
    }
});

class Login extends Component {
    render() {
        const { classes, auth, type } = this.props;
        if (auth) {
            return (
                <Redirect to='/main' />
            );
        }
        else {
            return (
                <Grid container className={classes.container} justify='center' direction='row'>
                    <Grid item xs={10} sm={6} md={4} lg={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="title" align='center' color='primary' style={{
                                marginTop: 20,
                                marginBottom: 20,
                            }}>
                                SUMMER
                            </Typography>
                            {type === 'login' ? <SigninTextField /> : <SignupTextField/>}
                        </Paper>
                    </Grid>
                </Grid>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.persisteditems.auth,
});

const mapDispatchToProps = (dispatch) => ({
})

Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Login);