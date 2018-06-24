import React, { Component } from 'react';
import { Typography, Paper, CircularProgress, Button, Grid } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { setIsReciting, setCheckedRes } from '../views/recitation/actions';
import WordDetail from '../components/worddetail';
import WordBrief from '../components/wordbrief';


const styles = theme => ({

});

class RecitingWord extends Component {
    constructor() {
        super();
        this.state = {
            idx: 0,
            showAll: false,
            checkedRes: [],
        };
    }

    render() {
        const { classes, words, setCheckedRes, isFetchingWords } = this.props;
        const { idx, showAll, checkedRes } = this.state;
        if (isFetchingWords || !words)
            return (<CircularProgress />)
        if (idx < words.length) {
            const { content, phoneme, audio } = words[idx];
            return (
                <Grid container>
                    {/* <div> */}
                    <Grid item xs={12} lg={12} style={{ minHeight: 350 }}>
                        {/* <div style={{minHeight: 500}}> */}
                        <WordDetail showAll={showAll} word={words[idx]} />
                        {/* </div> */}
                    </Grid>
                    <Grid item xs={12}>
                        {showAll ?
                            <Button fullWidth variant="raised" color="primary" style={{ marginTop: 10, marginBottom: 10 }} onClick={(event) => {
                                event.preventDefault();
                                this.setState({ showAll: false, idx: idx + 1 });
                            }}>下一个</Button>
                            :
                            <div>
                                <Button fullWidth variant="raised" color="primary" style={{ marginTop: 10, marginBottom: 1 }} onClick={(event) => {
                                    event.preventDefault();
                                    const newCheckedRes = checkedRes;
                                    newCheckedRes.push({ "id": words[idx].id, "checkedRes": true });
                                    this.setState({ showAll: true, checkedRes: newCheckedRes });
                                }}>认识</Button>
                                <Button fullWidth variant="raised" color="secondary" style={{ marginTop: 10, marginBottom: 1 }} onClick={(event) => {
                                    event.preventDefault();
                                    const newCheckedRes = checkedRes;
                                    newCheckedRes.push({ "id": words[idx].id, "checkedRes": false });
                                    this.setState({ showAll: true, checkedRes: newCheckedRes });
                                }}>不认识</Button>
                            </div>
                        }
                    </Grid>
                    {/* </div> */}
                </Grid>
            )
        }
        else {
            return (
                <Grid container>
                    {/* <div> */}
                    <Grid item xs={12} lg={12}>
                        {words && Object.values(words).map((word) => {
                            return (
                                <WordBrief word={word} key={word.id} />
                            )
                        })}
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="raised" color={"primary"} onClick={(event) => {
                            event.preventDefault();
                            this.setState({ showAll: false, idx: 0, checkedRes: [] });
                            setCheckedRes(checkedRes);
                        }} >
                            继续
                    </Button>
                    </Grid>
                </Grid>
            )
        }
    }

    componentWillUnmount(){
        this.setState({
            idx: 0,
            showAll: false,
            checkedRes: [],
        });
        this.props.setIsReciting(false);
    }
}

RecitingWord.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    words: state.recitation.words,
    isFetchingWords: state.recitation.isFetchingWords,
});

const mapDispatchToProps = (dispatch) => ({
    setCheckedRes: (checkedRes) => {
        dispatch(setCheckedRes(checkedRes));
    },
    setIsReciting: (isReciting) => {
        dispatch(setIsReciting(isReciting));
    },
})


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(RecitingWord);