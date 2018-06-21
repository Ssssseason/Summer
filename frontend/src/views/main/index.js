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
import { getRecPlanNum } from '../recitation/actions';
import { getWordBook } from '../setting/action';
import WordBook from '../../components/wordbook';


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
    item: {
        marginTop: 20,
        marginBottom: 20,
    },
});

class Main extends Component {
    componentWillMount() {
        this.props.getRecPlanNum();
        this.props.getWordBook();
    }

    render() {
        const { classes, targetNum, doneNum, incNum, getRecWord, history, currentWordBook } = this.props;

        return (
            <Grid container className={classes.container} justify='center' direction='row'>
                <Grid item xs={10} sm={10} md={8} lg={8}>
                    <Grid container justify="space-between">
                        <Grid item xs={12}>
                            <Paper className={classes.paper} style={{ cursor: "pointer" }} onClick={(event) => {
                                event.preventDefault();
                                history.push('/recitation');
                            }}>
                                <div>
                                    <div style={{ verticalAlign: 'middle', display: 'flex', justifyContent: "space-between" }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", flex: 1 }}>
                                            <div className={classes.item} >
                                                <Typography variant="title" color="default" align='center' >
                                                    今日计划单词数</Typography>
                                                <Typography color="primary" align='center' style={{ fontSize: 50 }}>
                                                    {targetNum}{` + `}{incNum}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", flex: 1 }}>
                                            <div className={classes.item}>
                                                <Typography variant="title" color="default" align='center'>
                                                    今日已完成数</Typography>
                                                <Typography color="primary" align='center' style={{ fontSize: 50 }}>
                                                    {doneNum}
                                                </Typography>
                                            </div>
                                        </div>
                                        {targetNum > doneNum ?
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", flex: 1 }}>
                                                <div className={classes.item}>
                                                    <Typography color="secondary" align='center' style={{ fontSize: 30 }}>
                                                        今日单词任务</Typography>
                                                    <Typography color="secondary" align='center' style={{ fontSize: 30 }}>
                                                        未完成</Typography>
                                                </div>
                                            </div>
                                            :
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", flex: 1 }}>
                                                <div className={classes.item}>
                                                    <Typography color="primary" align='center' style={{ fontSize: 30 }}>
                                                        今日单词任务 </Typography>
                                                    <Typography color="primary" align='center' style={{ fontSize: 30 }}>
                                                        已完成</Typography>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container justify="space-between">
                        <Grid item xs={5} md={4}>
                            <Paper className={classes.paper} style={{ cursor: "pointer" }}>
                                <Typography variant="subheading" style={{ display: "inline-flex", paddingTop: 15, paddingBottom: 15 }}>当前选择单词书</Typography>
                                {currentWordBook && <WordBook wordbook={currentWordBook} />}
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Paper className={classes.paper} style={{ cursor: "pointer" }} onClick={(event) => {
                                event.preventDefault();
                                history.push('/setting');
                            }}>
                                <Typography variant="subheading" style={{ display: "inline-flex", paddingTop: 15, paddingBottom: 15 }}>当前选择单词书</Typography>
                                {currentWordBook && <WordBook wordbook={currentWordBook} />}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            {/* <Grid item xs={12}> */}
                            <Paper className={classes.paper} style={{ cursor: "pointer" }} onClick={(event) => {
                                event.preventDefault();
                                history.push('/exam');
                            }}>
                                <Typography style={{ fontSize: 25 }} align="center" color="primary">去考核</Typography>
                            </Paper>
                            {/* </Grid> */}
                            {/* <Grid item xs={12}> */}
                            <Paper className={classes.paper} style={{ cursor: "pointer" }} onClick={(event) => {
                                event.preventDefault();
                                history.push('/userdefined');
                            }}>
                                <Typography style={{ fontSize: 25 }} align="center" color="primary">自定义单词</Typography>

                            </Paper>
                            {/* </Grid> */}
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}


const mapStateToProps = (state) => ({
    isFetchingRecPlanNum: state.recitation.isFetchingRecPlanNum,
    isReciting: state.recitation.isReciting,
    targetNum: state.recitation.targetNum,
    doneNum: state.recitation.doneNum,
    incNum: state.recitation.incNum,
    currentWordBook: state.setting.currentWordBook,
});

const mapDispatchToProps = (dispatch) => ({
    getRecPlanNum: () => {
        dispatch(getRecPlanNum());
    },
    getWordBook: () => {
        dispatch(getWordBook());
    },
})

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Main);
