import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Language from '@material-ui/icons/Language';
import Share from "@material-ui/icons/Share";
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "20px 1fr 400px 1fr 20px",
        gridTemplateRows: "20px 1fr 100px 2fr 20px"
    },
    paper: {
        gridColumn: "3 / 4",
        gridRow: "3 / 4",
        padding: "18px 12px",
        display: 'flex',
    },
    input: {
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
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

export default function UrlMinifierApp() {
    const classes = useStyles();
    const [formValid, setFormValid] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [urlToMinify, setUrlToMinify] = useState("");
    const [minifiedUrl, setMinifiedUrl] = useState("");

    async function submit(event) {
        event.preventDefault();
        const { currentTarget: { elements: { url } } } = event;
        setFormValid(url.checkValidity());

        if (url.checkValidity()) {
            const res = await fetch("http://localhost:3000/url", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url.value }),
            });
            const json = await res.json();
            console.info("json", json);
            setDialogOpen(true);
            setUrlToMinify(json.url);
            setMinifiedUrl(`http://localhost:8888/${json.identifier}`);
        }
    }

    function handleClose() {
        setDialogOpen(false);
        setUrlToMinify("");
        setMinifiedUrl("");
        document.getElementById("url-minifier-form").reset();
    }

    return (
        <div className={classes.root}>
            <Paper component="form"
                id="url-minifier-form"
                noValidate
                autoComplete="off"
                onSubmit={submit}
                className={classes.paper}>
                <TextField
                    id="outlined-basic"
                    label="Url"
                    variant="outlined"
                    name="url"
                    type="url"
                    error={!formValid}
                    helperText={!formValid && "Please check your url"}
                    autoFocus
                    className={classes.input}
                    placeholder="Minify Your Url!"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Language />
                            </InputAdornment>
                        ),
                        'aria-label': 'minify your url'
                    }}
                />
            </Paper>
            <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                        <Share className={classes.extendedIcon}/>
                        To Do..
                    </Fab>
                </DialogActions>
            </Dialog>
        </div>
    );
};
