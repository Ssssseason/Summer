import React, { Component } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const styles = theme => ({

});

class WordBrief extends Component {
    render() {
        const { content, pronunciation, definition } = this.props.word;
        return (
            <div>
                <Typography variant="title" align="center">
                    {content}
                </Typography>
                {definition && Object.values(definition).map((d) => {
                    return (<Typography>{d.type} {d.meaning}</Typography>)
                })}
            </div>
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
