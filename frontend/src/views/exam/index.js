import React, { Component } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: 50,
        paddingBottom: 50,
    },
    paper: {
        marginTop: 30,
        marginBottom: 30,
        padding: 40,
        // minHeight: 150,
        // maxWidth: 400,
    },
    // container: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     // margin: 100,
    // },
    // paper: {
    //     marginTop: 100,
    //     padding: 40,
    //     // maxWidth: 400,
    // }
});

class Exam extends Component {
    render() {
        const { classes, } = this.props;
        return (
            <Grid container className={classes.container} justify='center' direction='row'>
                <Grid item xs={10} sm={10} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="title" align='center' color='primary' style={{
                            marginTop: 20,
                            marginBottom: 20,
                        }}>
                            SUMMER
                            </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.persisteditems.auth,
});

const mapDispatchToProps = (dispatch) => ({
})

Exam.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Exam);