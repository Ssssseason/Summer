import React, { Component } from 'react';
import { Avatar, Menu, Typography, Divider, MenuItem } from "@material-ui/core";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../views/login/actions';
import { ROOT_URL } from '../config/config';


class UserAvatar extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
        }
    }

    render() {
        const { anchorEl } = this.state;
        const { avatar, history, logout } = this.props;
        return (
            <div style={{margin:5}}>
                <Avatar style={{ color: '#00796B', backgroundColor: '#fff', cursor: 'pointer', }}
                    onClick={(event) => {
                        event.preventDefault();
                        this.setState({ anchorEl: event.currentTarget });
                    }}
                    src={`${ROOT_URL}/${avatar}`}
                />
                <Menu open={Boolean(anchorEl)}
                    anchorEl={anchorEl} anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    getContentAnchorEl={null}
                    onClose={(event) => { console.log("exit"); this.setState({ anchorEl: null }); }}>
                    <MenuItem onClick={(event) => {
                        event.preventDefault();
                        this.setState({ anchorEl: null });
                        history.push('/setting');
                    }}>
                    <Typography variant="body1">学习设置</Typography>
                    </MenuItem>
                    {/* <MenuItem onClick={(event) => {
                        event.preventDefault();
                        this.setState({ anchorEl: null });
                        history.push('/usercenter');
                    }}>
                    <Typography variant="body1">个人中心</Typography>
                    </MenuItem> */}
                    <Divider />
                    <MenuItem onClick={(event) => {
                        event.preventDefault(); this.setState({ anchorEl: null });
                        logout();
                    }}>
                        <Typography variant="body1">退出</Typography>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return ({
        avatar: state.persisteditems.avatar,
    });
};

const mapDispatchToProps = (dispatch) =>(
    {
        logout: ()=>dispatch(logout()),
    }
) 

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);