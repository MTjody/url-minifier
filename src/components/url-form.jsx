import React, {useState} from "react";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Language from '@material-ui/icons/Language';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    paper: {
        gridColumn: "3 / 4",
        gridRow: "3 / 4",
        padding: "18px 12px",
        display: 'flex',
    },
    input: {
        flex: 1,
    }
}));

export default function UrlForm({submit}) {
    const classes = useStyles();
    const [formValid, setFormValid] = useState(true);

    function preSubmit(event) {
        event.preventDefault();
        const { currentTarget: { elements: { url } } } = event;
        setFormValid(url.checkValidity());
        if (url.checkValidity()) {
            submit(url.value);
        }
    }

    return (
        <Paper component="form"
            id="url-minifier-form"
            noValidate
            autoComplete="off"
            onSubmit={preSubmit}
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
    );
}
