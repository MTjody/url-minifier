import React from "react";
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Share from "@material-ui/icons/Share";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    contentText: {
        display: "flex"
    },
    scrollableUrl: {
        display: "inline-block",
        maxWidth: 140,
        overflowX: "scroll",
        whiteSpace: "nowrap",
        marginRight: 8,
        boxShadow: "0px 0px 2px 0px grey"
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function UrlDialog({open, handleClose, urlToMinify, minifiedUrl}) {
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Hooray</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.contentText}>
                    <span className={classes.scrollableUrl}>{urlToMinify}</span> has been minified!
                    </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="minifiedUrl"
                    label="Minified Url"
                    type="url"
                    fullWidth
                    disabled
                    value={minifiedUrl}
                />
            </DialogContent>
            <DialogActions>
                <Fab color="primary"
                    aria-label="add"
                    variant="extended"
                    onClick={handleClose}>
                    <Share className={classes.extendedIcon} />
                    To Do..
                </Fab>
            </DialogActions>
        </Dialog>
    );
}
