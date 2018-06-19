import React, { Component } from 'react';
import { Typography, Grid, Paper, CircularProgress, Button } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { setIsReciting,getRecWord } from '../views/recitation/actions';


const styles = theme => ({
    item: {
        marginTop: 20,
        marginBottom:20,
    },
    button: {
        marginTop: 20,
    },
});

class RecitingPlan extends Component {

    render() {
        const { classes, targetNum, doneNum, incNum, setIsReciting, getRecWord } = this.props;
        return (
            <div>
                <div style={{ verticalAlign: 'middle', display: 'flex', justifyContent: "space-between" }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", flex: 1 }}>
                        <div
                            className={classes.item}
                        >
                            <Typography variant="title" color="default" align='center' >
                                今日计划单词数
                                </Typography>
                            <Typography color="primary" align='center' style={{ fontSize: 50 }}>
                                {targetNum}{` + `}{incNum}
                            </Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", flex: 1 }}>
                        <div
                            className={classes.item}
                        >
                            <Typography variant="title" color="default" align='center'>
                                今日已完成数
                                </Typography>
                            <Typography color="primary" align='center' style={{ fontSize: 50 }}>
                                {doneNum}
                            </Typography>
                        </div>
                    </div>
                    {targetNum > doneNum ?
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", flex: 1 }}>
                            <div
                                className={classes.item}
                            >
                                <Typography color="secondary" align='center' style={{ fontSize: 30 }}>
                                    今日单词任务
                                 </Typography>
                                <Typography color="secondary" align='center' style={{ fontSize: 30 }}>
                                    未完成
                                 </Typography>
                                <div style={{ width: '100%', justifyContent: 'space-around', display: 'flex' }}>
                                    <Button variant="raised" color="primary" className={classes.button} size='large'
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setIsReciting(true);
                                            getRecWord('recite');
                                        }}
                                    >
                                        开始记忆
                                </Button>

                                </div>
                            </div>
                        </div>
                        :
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", flex: 1 }}>
                            <div
                                className={classes.item}
                            >
                                <Typography color="primary" align='center' style={{ fontSize: 30 }}>
                                    今日单词任务
                                 </Typography>
                                <Typography color="primary" align='center' style={{ fontSize: 30 }}>
                                    已完成
                                 </Typography>
                                <div style={{ width: '100%', justifyContent: 'space-around', display: 'flex' }}>
                                    <Button variant="raised" color="primary" className={classes.button} size='large'
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setIsReciting(true);
                                            getRecWord('review');
                                        }}
                                    >
                                        继续复习
                                </Button>

                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

        )
    }
}

RecitingPlan.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    targetNum: state.recitation.targetNum,
    doneNum: state.recitation.doneNum,
    incNum: state.recitation.incNum,
});

const mapDispatchToProps = (dispatch) => ({
    setIsReciting: (isReciting) => {
        dispatch(setIsReciting(isReciting));
    },
    getRecWord: (type)=>{
        dispatch(getRecWord(type));
    },
})


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(RecitingPlan);