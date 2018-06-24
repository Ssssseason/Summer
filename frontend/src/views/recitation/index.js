import React, { Component } from 'react';
import { Typography, Grid, Paper, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import RecitingPlan from '../../containers/recitingplan';
import RecitingWord from '../../containers/recitingword';
import { getRecPlanNum } from './actions';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        // paddingTop: 50,
        // paddingBottom: 50,
    },
    paper: {
        marginTop: 30,
        marginBottom: 30,
        padding: 40,
        // minHeight: 150,
        // maxWidth: 400,
    },
});

class Recitation extends Component {
    componentWillMount() {
        this.props.getRecPlanNum();
    }

    render() {
        const { classes, isFetchingRecPlanNum, isReciting } = this.props;

        return (
            <Grid container className={classes.container} justify='center' direction='row'>
                <Grid item xs={10} sm={10} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        <Grid container justify="center">
                            {isFetchingRecPlanNum ?
                                <CircularProgress />
                                :
                                isReciting ?
                                    <Grid item xs={12} lg={6}>
                                        <RecitingWord />
                                    </Grid>
                                    :
                                    <RecitingPlan />
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

Recitation.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    isFetchingRecPlanNum: state.recitation.isFetchingRecPlanNum,
    isReciting: state.recitation.isReciting,
});

const mapDispatchToProps = (dispatch) => ({
    getRecPlanNum: () => {
        dispatch(getRecPlanNum());
    },
})


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Recitation);