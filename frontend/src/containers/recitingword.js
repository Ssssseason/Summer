import React, { Component } from 'react';
import { Typography, Paper, CircularProgress, Button } from '@material-ui/core'
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
                <div>
                    <WordDetail showAll={showAll} word={words[idx]} />
                    {showAll ?
                        <Button variant="raied" color="primary" onClick={(event) => {
                            event.preventDefault();
                            this.setState({ showAll: false, idx: idx + 1 });
                        }}>下一个</Button>
                        :
                        <div>
                            <Button variant="raised" color="primary" onClick={(event) => {
                                event.preventDefault();
                                const newCheckedRes = checkedRes;
                                newCheckedRes.push({ "id": words[idx].id, "checkedRes": true });
                                this.setState({ showAll: true, checkedRes: newCheckedRes });
                            }}>认识</Button>
                            <Button variant="raised" color="secondary" onClick={(event) => {
                                event.preventDefault();
                                const newCheckedRes = checkedRes;
                                newCheckedRes.push({ "id": words[idx].id, "checkedRes": false });
                                this.setState({ showAll: true, checkedRes: newCheckedRes });
                            }}>不认识</Button>
                        </div>
                    }
                </div>
            )
        }
        else {
            return (
                <div>
                    {words && Object.values(words).map((word) => {
                        return (
                            <WordBrief word={word} key={word.id} />
                        )
                    })}
                    <Button variant="raised" color={"primary"} onClick={(event) => {
                        event.preventDefault();
                        this.setState({ showAll: false, idx: 0, checkedRes: [] });
                        setCheckedRes(checkedRes);
                    }} >
                        继续
                    </Button>
                </div>
            )
        }
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
})


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(RecitingWord);