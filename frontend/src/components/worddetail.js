import React, { Component } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const styles = theme => ({

});

class WordDetail extends Component {
    render() {
        const { showAll } = this.props;
        const { content, phonetic, definition, translation } = this.props.word;
        return (
            <div>
                <Typography align="center" style={{ fontSize: 38 }}>
                    {content}
                </Typography>
                <Typography align="center" style={{ fontSize: 25, color: "#a0a0a0" }}>/{phonetic}/</Typography>
                {showAll &&
                    <div style={{paddingLeft: 30, paddingRight: 30}}>
                        <Typography style={{ marginTop: 10, marginBottom: 10 }} variant="subheading" color="primary">英语释义</Typography>
                        {definition && Object.values(definition).map((d, i) => {

                            return (<Typography style={{ fontize: 15, marginTop: 10, marginBottom: 10, marginLeft: 10 }} key={d[0]}>{i + 1}. {d}</Typography>)
                        })}
                        <Typography style={{ marginTop: 10, marginBottom: 10 }} variant="subheading" color="primary">中文释义</Typography>
                        {translation && Object.values(translation).map((t, i) => {

                            return (<Typography style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 10 }} key={t[0]}>{i + 1}. {t}</Typography>)
                        })}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
})

WordDetail.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(WordDetail);
