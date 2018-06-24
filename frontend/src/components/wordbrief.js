import React, { Component } from 'react';
import { Button, Grid, TextField, Typography, Divider } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const styles = theme => ({

});

class WordBrief extends Component {
    render() {
        const { content, phonetic, definition, translation } = this.props.word;
        return (
            <Grid container style={{marginTop: 20, marginBottom: 20}}>
                <Grid item xs={12}>
                    <Typography style={{ fontSize: 25, display: "inline-block" }}>
                        {content}
                    </Typography>
                    <Typography style={{ color: "#a0a0a0", display: "inline-block", margin: 10 }}>/{phonetic}/</Typography>
                </Grid>
                <Grid item xs={12}>
                    {/* <div style={{ paddingLeft: 30, paddingRight: 30 }}> */}
                    <Typography style={{ marginTop: 10, marginBottom: 10 }} variant="subheading" color="primary">英语释义</Typography>
                    {definition && Object.values(definition).map((d, i) => {

                        return (<Typography style={{ fontize: 15, marginTop: 10, marginBottom: 10, marginLeft: 10 }} key={d[0]}>{i + 1}. {d}</Typography>)
                    })}
                    <Typography style={{ marginTop: 10, marginBottom: 10 }} variant="subheading" color="primary">中文释义</Typography>
                    {translation && Object.values(translation).map((t, i) => {

                        return (<Typography style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 10 }} key={t[0]}>{i + 1}. {t}</Typography>)
                    })}
                    {/* </div> */}
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
})

WordBrief.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(WordBrief);
