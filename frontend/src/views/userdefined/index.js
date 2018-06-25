import React, { Component } from 'react';
import { Typography, Grid, Paper, CircularProgress, Table, TableBody, TableCell, TableRow, TableHead, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableFooter, TablePagination } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { setUDIsEditing, getUserDefined, delUserDefined, postUserDefined, putUserDefined, setUDFinished } from './actions';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';


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
        paddingTop: 40,
        paddingBottom: 40,
        overflowX: "auto",
        // minHeight: 150,
        // maxWidth: 400,
    },
    button: {
        margin: 10,
    },
});

const initWord = {
    'content': "",
    'definition': "",
    'translation': "",
}

class Userdefined extends Component {
    constructor() {
        super();
        this.state = {
            isAddOpen: false,
            isEditOpen: false,
            isDelOpen: false,
            currentWord: initWord,
            page: 0,
            rowsPerPage: 5,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    componentWillMount() {
        this.props.getUserDefined();
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes, isFetching, words, getUserDefined, postUserDefined, putUserDefined,
            delUserDefined, hasFinished, dialogContent, isEditing, setUDFinished,
            setUDIsEditing } = this.props;
        const { isAddOpen, page, rowsPerPage, isEditOpen, isDelOpen, currentWord } = this.state;
        console.log(currentWord);
        return (
            <Grid container className={classes.container} justify='center' direction='row'>
                <Grid item xs={11} sm={10} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        <Grid container  >
                            <Grid item xs={12} style={{ paddingLeft: 40, paddingRight: 40 }}>
                                <Grid container justify="space-between"  >
                                    <Grid item xs={6} sm={4} >
                                        <Typography variant="subheading" color="primary" style={{ display: "inline-flex", paddingTop: 15, paddingBottom: 15 }}>
                                            自定义单词：</Typography>
                                    </Grid>
                                    <Grid item sm={6} xs={6} style={{ display: 'inline-flex', justifyContent: "flex-end" }}>
                                        {isEditing ?
                                            <Button variant="raised" color="secondary" className={classes.button} onClick={(event) => {
                                                event.preventDefault();
                                                setUDIsEditing(false);
                                            }}>退出编辑</Button>
                                            :
                                            <Button variant="raised" color="primary" className={classes.button} onClick={(event) => {
                                                event.preventDefault();
                                                setUDIsEditing(true);
                                            }}>编辑</Button>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            {isFetching ?
                                <Grid item xs={12}>
                                    <CircularProgress />
                                </Grid>
                                :
                                <Grid item xs={12}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                {isEditing && <TableCell padding="checkbox"></TableCell>}
                                                <TableCell padding="checkbox">单词</TableCell>
                                                <TableCell padding="checkbox">英文释义</TableCell>
                                                <TableCell padding="checkbox">中文释义</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {isEditing &&
                                                <TableRow >
                                                    <TableCell padding="checkbox">
                                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                                            <AddIcon style={{ margin: 5, cursor: "pointer" }} onClick={(event) => {
                                                                event.preventDefault();
                                                                this.setState({ isAddOpen: true });
                                                            }} />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            }
                                            {words && words.slice(page * rowsPerPage, page*rowsPerPage+rowsPerPage).map(w => {
                                                return (
                                                    <TableRow key={w.id}>
                                                        {isEditing &&
                                                            <TableCell padding="checkbox">
                                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                                    <CreateIcon style={{ margin: 3, cursor: "pointer" }} onClick={(event) => {
                                                                        event.preventDefault();
                                                                        this.setState({ isEditOpen: true, currentWord: w });
                                                                    }} />
                                                                    <DeleteIcon style={{ margin: 3, cursor: "pointer" }} onClick={(event) => {
                                                                        event.preventDefault();
                                                                        this.setState({ isDelOpen: true, currentWord: w });
                                                                    }} />
                                                                </div>
                                                            </TableCell>
                                                        }
                                                        <TableCell padding="checkbox" style={{
                                                            whiteSpace: "normal",
                                                            wordWrap: "break-word"
                                                        }}>{w.content}</TableCell>
                                                        <TableCell padding="checkbox" style={{
                                                            whiteSpace: "normal",
                                                            wordWrap: "break-word"
                                                        }}>{w.definition}</TableCell>
                                                        <TableCell padding="checkbox" style={{
                                                            whiteSpace: "normal",
                                                            wordWrap: "break-word"
                                                        }}>{w.translation}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                    {words&&<TablePagination
                                        component="div"
                                        count={words.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />}
                                </Grid>
                            }
                        </Grid>
                    </Paper>
                    <Dialog fullWidth
                        open={isAddOpen}
                        onClose={(event) => {
                            event.preventDefault();
                            this.setState({ isAddOpen: false, currentWord: initWord });
                        }}
                        aria-labelledby="add_form-dialog-title">
                        <DialogTitle id="add_form-dialog-title">添加新单词</DialogTitle>
                        <DialogContent>
                            {/* <DialogContentText>添加新单词</DialogContentText> */}
                            <TextField
                                autoFocus
                                margin="dense"
                                id="content"
                                label="单词内容"
                                helperText="不得为空"
                                fullWidth
                                onChange={(event) => {
                                    this.setState({
                                        currentWord: Object.assign({}, currentWord, { content: event.target.value })
                                    });
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="definition"
                                label="英文释义"
                                fullWidth
                                onChange={(event) => {
                                    this.setState({
                                        currentWord: Object.assign({}, currentWord, { definition: event.target.value })
                                    });
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="translation"
                                label="中文释义"
                                fullWidth
                                onChange={(event) => {
                                    this.setState({
                                        currentWord: Object.assign({}, currentWord, { translation: event.target.value })
                                    });
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(event) => {
                                event.preventDefault();
                                if (currentWord.content !== "") {
                                    this.setState({ isAddOpen: false, currentWord: initWord });
                                    postUserDefined(currentWord);
                                }
                            }} color="primary">
                                确定</Button>
                            <Button onClick={(event) => {
                                event.preventDefault();
                                this.setState({ isAddOpen: false, currentWord: initWord });
                            }} color="secondary">
                                取消</Button>
                        </DialogActions>
                    </Dialog>
                    {currentWord &&
                        <div>
                            <Dialog fullWidth
                                open={isEditOpen}
                                onClose={(event) => {
                                    event.preventDefault();
                                    this.setState({ isEditOpen: false, currentWord: initWord });
                                }}
                                aria-labelledby="add_form-dialog-title" >
                                <DialogTitle id="add_form-dialog-title">编辑单词</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="content"
                                        label="单词内容"
                                        helperText="不得为空"
                                        defaultValue={currentWord.content}
                                        fullWidth
                                        onChange={(event) => {
                                            this.setState({
                                                currentWord: Object.assign({}, currentWord, { content: event.target.value })
                                            });
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="definition"
                                        label="英文释义"
                                        defaultValue={currentWord.definition}
                                        fullWidth
                                        onChange={(event) => {
                                            this.setState({
                                                currentWord: Object.assign({}, currentWord, { definition: event.target.value })
                                            });
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="translation"
                                        label="中文释义"
                                        defaultValue={currentWord.translation}
                                        fullWidth
                                        onChange={(event) => {
                                            this.setState({
                                                currentWord: Object.assign({}, currentWord, { translation: event.target.value })
                                            });
                                        }}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={(event) => {
                                        event.preventDefault();
                                        if (currentWord.content !== "") {
                                            this.setState({ isEditOpen: false, currentWord: initWord });
                                            putUserDefined(currentWord);
                                        }
                                    }} color="primary">
                                        确定</Button>
                                    <Button onClick={(event) => {
                                        event.preventDefault();
                                        this.setState({ isEditOpen: false, currentWord: initWord });
                                    }} color="secondary">
                                        取消</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog fullWidth
                                open={isDelOpen}
                                onClose={(event) => {
                                    event.preventDefault();
                                    this.setState({ isDelOpen: false, currentWord: initWord });
                                }}
                                aria-labelledby="add_form-dialog-title">
                                <DialogTitle id="add_form-dialog-title">删除单词</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>是否删除单词 {currentWord.content}</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={(event) => {
                                        event.preventDefault();
                                        this.setState({ isDelOpen: false, currentWord: initWord });
                                        delUserDefined(currentWord.id);
                                    }} color="primary">
                                        确定</Button>
                                    <Button onClick={(event) => {
                                        event.preventDefault();
                                        this.setState({ isDelOpen: false, currentWord: initWord });
                                    }} color="secondary">
                                        取消</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    }
                    <Dialog fullWidth
                        open={hasFinished}
                        onClose={(event) => {
                            event.preventDefault();
                            setUDFinished(false);
                        }}
                        aria-labelledby="add_form-dialog-title">
                        <DialogTitle id="add_form-dialog-title">自定义单词</DialogTitle>
                        <DialogContent>
                            <DialogContentText>{dialogContent}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(event) => {
                                event.preventDefault();
                                setUDFinished(false);
                            }} color="primary">
                                确定</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        )
    }

    componentWillUnmount() {
        this.props.setUDIsEditing(false);
    }
}

Userdefined.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    isEditing: state.userdefined.isEditing,
    words: state.userdefined.words,
    isFetching: state.userdefined.isFetching,
    hasFinished: state.userdefined.hasFinished,
    dialogContent: state.userdefined.dialogContent,
});

const mapDispatchToProps = (dispatch) => ({
    setUDIsEditing: (isEditing) => {
        dispatch(setUDIsEditing(isEditing));
    },
    getUserDefined: () => {
        dispatch(getUserDefined());
    },
    postUserDefined: (word) => {
        dispatch(postUserDefined(word));
    },
    putUserDefined: (word) => {
        dispatch(putUserDefined(word));
    },
    delUserDefined: (id) => {
        dispatch(delUserDefined(id));
    },
    setUDFinished: (hasFinished) => {
        dispatch(setUDFinished(hasFinished));
    },
})


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Userdefined);