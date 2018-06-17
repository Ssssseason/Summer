import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Paper } from '@material-ui/core';

const styles = {

};

class Main extends React.Component{
    render(){
        return (
            <Paper>hello jyx</Paper>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Main);
