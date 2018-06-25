import React, { Component } from 'react';
import { Typography, Grid, Paper, CircularProgress, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import RecitingPlan from '../../containers/recitingplan';
import RecitingWord from '../../containers/recitingword';
import { getRecPlanNum, setRecHasFinished } from './actions';


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
        const { classes, setRecHasFinished, hasFinished, dialogContent, isFetchingRecPlanNum, isReciting } = this.props;

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
                    <Dialog fullWidth
                        open={hasFinished}
                        onClose={(event) => {
                            event.preventDefault();
                            setRecHasFinished(false);
                        }}
                        aria-labelledby="add_form-dialog-title">
                        <DialogTitle id="add_form-dialog-title">背诵</DialogTitle>
                        <DialogContent>
                            <DialogContentText>{dialogContent}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(event) => {
                                event.preventDefault();
                                setRecHasFinished(false);
                            }} color="primary">
                                确定</Button>
                        </DialogActions>
                    </Dialog>
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
    hasFinished: state.recitation.hasFinished,
    dialogContent: state.recitation.dialogContent,
});

const mapDispatchToProps = (dispatch) => ({
    getRecPlanNum: () => {
        dispatch(getRecPlanNum());
    },
    setRecHasFinished: (hasFinished) => {
        dispatch(setRecHasFinished(hasFinished));
    },
})


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Recitation);