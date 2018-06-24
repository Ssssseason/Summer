import React, { Component } from 'react';
import { Button, Grid, TextField, Typography, Divider } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ROOT_URL } from '../config/config';

const styles = theme => ({

});

class WordBook extends Component {
    render() {
        const { id, name, introduction, cover, creatorName, wordNum, doneNum } = this.props.wordbook;
        const { classes } = this.props;
        return (
            <div style={{ display: "inline-block", width:"100%" }}>
                <div style={{display: "inline-block", maxWidth: 100, marginRight: 20}}>
                    <img style={{ width: 100, height: 130 }} src={`${ROOT_URL}/${cover}`} />
                </div>
                <div style={{ display: "inline-block", verticalAlign:"top"}}>
                    <Typography variant="subheading" color="primary" style={{fontSize: 18, marginBottom:10}}
                    //TODO: 是否需要增加单词书详情界面：列出具体单词
                    >
                        {name}
                    </Typography>
                    <Typography>创建者：{creatorName}</Typography>
                    <Typography>单词数：{wordNum}</Typography>
                    <Typography>进度：{(doneNum * 1.0 / wordNum).toFixed(2)}%</Typography>
                </div>
                <Typography style={{ width: "100%", margin:15 }}>
                    {introduction}
                </Typography>
                <Divider/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
})

WordBook.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(WordBook);
