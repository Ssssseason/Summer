import React, { Component } from 'react';
import { Typography, Grid, Paper, CircularProgress, Radio, Button } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { setSettingState, getWordBooks } from './actions';
import WordBook from '../../components/wordbook';
import { setWordBook, getWordBook, getTargetNum } from '../setting/action';
import { PageNums } from '../../components/pagenums';


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
    button: {
        margin: 10,
    },
});

class WordBookCategory extends Component {
    constructor() {
        super();
        this.state = {
            chosenId: undefined,
            currentPageNum: 1,
        };
    }

    componentWillMount() {
        this.props.getWordBooks();
    }

    render() {
        const { classes, isFetching, isEditing, wordbooks, setWordBook, setSettingState,
            history, getWordBook, getTargetNum } = this.props;
        const { chosenId, currentPageNum } = this.state;
        const pageSize = 6;
        // TODO: 由于book不是很多，所以可以一次性获取，存储起来，前端内部翻页
        if (wordbooks)
            console.log(currentPageNum, pageSize, wordbooks, wordbooks.slice((currentPageNum - 1) * pageSize, currentPageNum * pageSize));
        return (
            <Grid container className={classes.container} justify='center' direction='row'>
                <Grid item xs={10} sm={10} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        {isFetching ? <CircularProgress />
                            :
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="title" color="primary">
                                        所有单词书
                                    </Typography>
                                </Grid>
                                {
                                    wordbooks && Object.values(wordbooks.slice((currentPageNum - 1) * pageSize, currentPageNum * pageSize)).map((wordbook) => {
                                        return (
                                            <Grid item md={6} xs={12} style={{ padding: 10 }} key={wordbook.id}>
                                                <Grid container justify="center">
                                                    {isEditing &&
                                                        // <Grid container>
                                                        <Grid item sm={1} xs={12}>
                                                            <div style={{display: "flex", justifyContent:"center"}}>
                                                            <Radio checked={chosenId === wordbook.id}
                                                                onChange={(event) => {
                                                                    event.preventDefault();
                                                                    console.log(wordbook.id);
                                                                    this.setState({
                                                                        chosenId: wordbook.id,
                                                                    });
                                                                }} />
                                                            </div>
                                                        </Grid>
                                                        // </Grid>
                                                    }
                                                    <Grid item sm={10} xs={12}>
                                                        <WordBook wordbook={wordbook} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }
                                {wordbooks &&
                                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                        <PageNums pageNum={(wordbooks.length - 1) / pageSize + 1} currPage={currentPageNum} clickPage={(event) => {
                                            this.setState({
                                                currentPageNum: parseInt(event.target.innerText)
                                            })
                                        }}>
                                        </PageNums>
                                    </div>
                                }
                                {isEditing &&
                                    <Grid item xs={12}>
                                        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                            <Button variant="raised" className={classes.button} color="primary" onClick={(event) => {
                                                event.preventDefault();
                                                this.setState({ chosenId: undefined });
                                                setSettingState(false);
                                                setWordBook(chosenId);
                                                getWordBook();
                                                history.push('/setting');
                                            }}>确定</Button>
                                            <Button variant="raised" className={classes.button} color="secondary" onClick={(event) => {
                                                this.setState({ chosenId: undefined });
                                                setSettingState(false);;
                                            }}>取消</Button>
                                        </div>
                                    </Grid>
                                }
                            </Grid>
                        }
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    componentWillUnmount() {
        this.props.setSettingState(false);
    }
}

WordBookCategory.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    wordbooks: state.wordbookcategory.wordbooks,
    isFetching: state.wordbookcategory.isFetching,
    isEditing: state.wordbookcategory.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
    setSettingState: (isEditing) => {
        dispatch(setSettingState(isEditing));
    },
    getWordBooks: () => {
        dispatch(getWordBooks());
    },
    getWordBook: () => {
        dispatch(getWordBook());
    },
    getTargetNum: () => {
        dispatch(getTargetNum());
    },
    setWordBook: (id) => {
        dispatch(setWordBook(id));
    },
})


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(WordBookCategory);