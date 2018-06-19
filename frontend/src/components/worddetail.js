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
        const { content, pronunciation, definition } = this.props.word;
        return (
            <div>
                <Typography variant="title" align="center">
                    {content}
                </Typography>
                {pronunciation && Object.values(pronunciation).map((p) => {
                    return (<Typography>{p.phoneme}{p.audio}</Typography>)
                })}
                {showAll && definition && Object.values(definition).map((d) => {
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

WordDetail.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(WordDetail);
