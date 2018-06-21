import React, { Component } from 'react';
import { Typography, Grid, Paper, CircularProgress } from '@material-ui/core'
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
});

class Userdefined extends Component {
    componentWillMount() {
    }

    render() {
        const { classes, } = this.props;

        return (
            <Grid container className={classes.container} justify='center' direction='row'>
                <Grid item xs={10} sm={10} md={8} lg={8}>
                    <Paper className={classes.paper}>

                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

Userdefined.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
})


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Userdefined);