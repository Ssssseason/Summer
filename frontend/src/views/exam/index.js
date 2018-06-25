import React, { Component } from 'react';
import { Typography, Grid, Paper, Button, CircularProgress, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { getWordBook } from '../setting/action';
import { setExamState, getExam, postExam, setExamHasFinished } from './actions';


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

class Exam extends Component {
    constructor() {
        super();
        this.state = {
            idx: 0,
            showQueRes: false,
            examRes: [],
            lastOptionIdx: 0,
        };
    }

    componentWillMount() {
        this.props.getWordBook();
    }

    render() {
        const { classes, setExamHasFinished, hasFinished, dialogContent, questions, postExam,
            isExaming, getExam, currentWordBook, isFetchingWordBook, setExamState } = this.props;
        const { idx, lastOptionIdx, showQueRes, examRes } = this.state;
        // const { answer, content, id, options, phonetic } = questions[idx];

        return (
            <Grid container className={classes.container} justify='center' direction='row'>
                <Grid item xs={10} sm={10} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        {!isExaming ?
                            isFetchingWordBook || !currentWordBook ?
                                <CircularProgress />
                                :
                                <Grid container >
                                    <Grid item xs={12}>
                                        <Typography variant="title" align='center' color='primary' style={{
                                            fontSize: 30,
                                            marginTop: 10,
                                            marginBottom: 10,
                                        }}>当前单词书进度</Typography>
                                        <Typography variant="title" align='center' color='secondary' style={{
                                            fontSize: 50,
                                        }}>
                                            {currentWordBook.doneNum} / {currentWordBook.wordNum}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                        <Button variant="raised" color="primary" style={{ marginTop: 30 }} onClick={(event) => {
                                            event.preventDefault();
                                            setExamState(true);
                                            getExam();
                                        }} >开始考核</Button>
                                    </Grid>
                                </Grid>
                            :
                            questions ?
                                idx === questions.length ?
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item xs={12}>
                                            <Typography variant="title" align='center' color='primary' style={{
                                                fontSize: 30,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}>考核结果</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="title" align='center' color='primary' style={{
                                                fontSize: 50,
                                            }}>{examRes.reduce((cnt, res) => {
                                                if (res) {
                                                    cnt += 1;
                                                };
                                                return cnt;
                                            }, 0)} / {questions.length}</Typography>
                                        </Grid>
                                        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                            <Button variant="raised" style={{ marginTop: 30 }} color="primary" onClick={(event) => {
                                                event.preventDefault();
                                                setExamState(false);
                                                if (examRes.length != 0) {
                                                    postExam(examRes);
                                                }
                                                this.setState({
                                                    idx: 0,
                                                    showQueRes: false,
                                                    examRes: [],
                                                    lastOptionIdx: 0,
                                                })
                                            }}>确定</Button>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item xs={12}>
                                            <Typography align="center">
                                                进度：{idx + 1} / {questions.length}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography style={{ fontSize: 38, }} align="center">
                                                {questions[idx].content}
                                            </Typography>
                                            <Typography style={{ color: "#a0a0a0", fontSize: 25 }} align="center">/{questions[idx].phonetic}/</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Grid container>
                                                {
                                                    questions[idx].phonetic && Object.values(questions[idx].options).map((option, i) => {
                                                        var s = { marginTop: 10, marginBottom: 10 };
                                                        if (showQueRes) {
                                                            if (questions[idx].answer === i) {
                                                                s['backgroundColor'] = "#e8f5e9";
                                                            }
                                                            else if (lastOptionIdx === i) {
                                                                s['backgroundColor'] = "#ffeeee";
                                                            }
                                                        }
                                                        return (
                                                            <Grid item xs={12} key={i}>
                                                                <Button fullWidth variant="outlined" disabled={showQueRes}
                                                                    style={s}
                                                                    onClick={(event) => {
                                                                        event.preventDefault();
                                                                        var res = examRes;
                                                                        res.push({ "id": questions[idx].id, "res": questions[idx].answer === i });
                                                                        this.setState({ showQueRes: true, examRes: res, lastOptionIdx: i });
                                                                    }} >{option}</Button>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </Grid>
                                        {showQueRes &&
                                            <Grid item xs={12}>
                                                <Button fullWidth variant="raised" color="primary" style={{ marginTop: 20, marginRight: 20 }}
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        this.setState({
                                                            idx: idx + 1,
                                                            showQueRes: false,
                                                        });
                                                    }}>下一个</Button>
                                            </Grid>
                                        }
                                    </Grid>
                                :
                                <CircularProgress />
                        }
                    </Paper>
                    <Dialog fullWidth
                        open={hasFinished}
                        onClose={(event) => {
                            event.preventDefault();
                            setExamHasFinished(false);
                        }}
                        aria-labelledby="add_form-dialog-title">
                        <DialogTitle id="add_form-dialog-title">考核</DialogTitle>
                        <DialogContent>
                            <DialogContentText>{dialogContent}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(event) => {
                                event.preventDefault();
                                setExamHasFinished(false);
                            }} color="primary">
                                确定</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        )
    }

    componentWillUnmount() {
        this.setState({
            idx: 0,
            showQueRes: false,
            examRes: [],
            lastOptionIdx: 0,
        });
        this.props.setExamState(false);
    }
}

const mapStateToProps = (state) => ({
    auth: state.persisteditems.auth,
    isExaming: state.exam.isExaming,
    currentWordBook: state.setting.currentWordBook,
    isFetchingWordBook: state.setting.isFetchingWordBook,
    questions: state.exam.questions,
    hasFinished: state.exam.hasFinished,
    dialogContent: state.exam.dialogContent,
    // showQueRes: state.exam.showQueRes,
});

const mapDispatchToProps = (dispatch) => ({
    getWordBook: () => {
        dispatch(getWordBook());
    },
    setExamState: (isExaming) => {
        dispatch(setExamState(isExaming));
    },
    getExam: () => {
        dispatch(getExam());
    },
    postExam: (examRes) => {
        dispatch(postExam(examRes));
    },
    setExamHasFinished: (hasFinished) => {
        dispatch(setExamHasFinished(hasFinished));
    },
})

Exam.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Exam);