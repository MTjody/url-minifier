import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "20px 1fr 400px 1fr 20px",
        gridTemplateRows: "20px 1fr 60px 1fr 20px"
    },
    paper: {
        gridColumn: "3 / 4",
        gridRow: "3 / 4",
        padding: '2px 4px',
        display: 'flex',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

export default function UrlMinifierApp() {
    const classes = useStyles();
    const [formValid, setFormValid] = useState(true);
    
    async function submit(event) {
        event.preventDefault();
        const { currentTarget: { elements: { url } }} = event;
        console.info("on submit!", url.value);
        setFormValid(url.checkValidity());
        if (formValid) {
            const res = await fetch("http://localhost:3000/url", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({url: url.value}),
            });
            console.info("res", res);
            const json = await res.json();
            console.info("json", json.minifiedUrl);
        }
    }

    return (
        <div className={classes.root}>
            <Paper component="form" noValidate autoComplete="off" onSubmit={submit} className={classes.paper}>
                <TextField id="outlined-basic" 
                    label="Url" variant="outlined"
                    name="url"
                    type="url"
                    error={!formValid}
                    helperText={!formValid && "Please check your url"}
                    autoFocus
                    className={classes.input}
                    placeholder="Minify Your Url!"
                    inputProps={{ 'aria-label': 'minify your url' }} />    

                <Divider className={classes.divider} orientation="vertical" />
                <IconButton onClick={submit} color="primary" className={classes.iconButton} aria-label="minify your url">
                    <LanguageIcon />
                </IconButton>
            </Paper>
        </div>
    );
};
