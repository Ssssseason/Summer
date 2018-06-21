import React, { Component } from 'react';
import { Typography, Grid, Paper, CircularProgress, TextField, Button, Divider } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import WordBook from '../../components/wordbook';
import { setSettingState } from '../wordbookcategory/actions';
import { setTargetNum, getTargetNum, getWordBook } from './action';

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
    // },
    // paper: {
    //     marginTop: 100,
    //     padding: 40,
    //     // maxWidth: 400,
    // },
    button: {
        margin: 10,
    },

});

class Setting extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            newTargetNum: undefined,
        };
    }

    componentDidMount() {
        this.props.getWordBook();
        this.props.getTargetNum();
    }


    render() {
        const { classes, history, setSettingState, isFetchingTargetNum, isFetchingWordBook, currentTargetNum, currentWordBook, currentScription } = this.props;
        const { isEditing, newTargetNum } = this.state;
        console.log(isFetchingTargetNum, isFetchingWordBook);
        return (
            <Grid container className={classes.container} justify='center' direction='row'>
                <Grid item xs={10} sm={10} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        {(isFetchingTargetNum || isFetchingWordBook) ? <CircularProgress /> :
                            <div style={{ padding: 20 }}>
                                <Grid container style={{ display: 'flex', justifyContent: "space-between", }}>
                                    <Grid item md={7} xs={10} style={{ display: "inline-flex", verticalAlign: "middle" }}>
                                        <Typography variant="subheading" style={{ display: "inline-flex", paddingTop: 15, paddingBottom: 15 }}>
                                            每日学习量：
                                        </Typography>
                                        <TextField disabled={!isEditing} defaultValue={currentTargetNum}
                                            style={{ padding: 10 }}
                                            value={newTargetNum} onChange={(event) => {
                                                event.preventDefault();
                                                this.setState({
                                                    newTargetNum: event.target.value,
                                                })
                                            }} />
                                    </Grid>
                                    <Grid item md={5} xs={12} style={{ display: 'inline-flex', justifyContent: "flex-end" }}>
                                        {!isEditing ?
                                            <Button variant="raised" className={classes.button} color="primary" onClick={(event) => {
                                                this.setState({ isEditing: true, newTargetNum: currentTargetNum });
                                            }}>修改</Button>
                                            :
                                            <div>
                                                <Button variant="raised" className={classes.button} color="primary" onClick={(event) => {
                                                    this.setState({ isEditing: false });
                                                    this.props.setTargetNum(newTargetNum);
                                                }}>确定</Button>
                                                <Button variant="raised" className={classes.button} color="secondary" onClick={(event) => {
                                                    this.setState({ isEditing: false, newTargetNum: currentTargetNum })
                                                }}>取消</Button>
                                            </div>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid container style={{ display: 'flex', justifyContent: "space-between", }}>
                                    <Grid item md={7} xs={10} style={{ display: "inline-flex", verticalAlign: "middle" }}>
                                        <Typography variant="subheading" style={{ display: "inline-flex", paddingTop: 15, paddingBottom: 15 }}>当前选择单词书</Typography>
                                    </Grid>
                                    <Grid item md={5} xs={12} style={{ display: 'inline-flex', justifyContent: "flex-end" }}>
                                    <div>
                                        <Button variant="raised" className={classes.button} color="primary" onClick={(event) => {
                                            event.preventDefault();
                                            setSettingState(true);
                                            history.push('/wordbook/category');
                                        }}>修改
                                        </Button>
                                        </div>
                                    </Grid>
                                    {currentWordBook && <WordBook wordbook={currentWordBook} />}
                                </Grid>
                            </div>}
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

Setting.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    currentTargetNum: state.setting.currentTargetNum,
    currentWordBook: state.setting.currentWordBook,
    currentScription: state.setting.currentScription,
    isFetchingTargetNum: state.setting.isFetchingTargetNum,
    isFetchingWordBook: state.setting.isFetchingWordBook,
});

const mapDispatchToProps = (dispatch) => ({
    setSettingState: (isEditing) => {
        dispatch(setSettingState(isEditing));
    },
    setTargetNum: (targetNum) => {
        dispatch(setTargetNum(targetNum));
    },
    getTargetNum: () => {
        dispatch(getTargetNum());
    },
    getWordBook: () => {
        dispatch(getWordBook());
    },
})


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Setting);