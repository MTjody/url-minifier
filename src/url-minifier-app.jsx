import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Language from '@material-ui/icons/Language';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    }
}));

export default function UrlMinifierApp() {
    const classes = useStyles();
    const [formValid, setFormValid] = useState(true);

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
        }
    }

    return (
        <div className={classes.root}>
            <Paper component="form"
                noValidate
                autoComplete="off"
                onSubmit={submit}
                className={classes.paper}>
                <TextField id="outlined-basic"
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
        </div>
    );
};
