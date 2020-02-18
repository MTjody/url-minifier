import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
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

function submit(event) {
    event.preventDefault();
    console.info("on submit!");
}


export default function UrlMinifierApp() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper component="form" onSubmit={submit} className={classes.paper}>
                <InputBase
                    className={classes.input}
                    placeholder="Minify Your Url!"
                    inputProps={{ 'aria-label': 'minify your url' }}
                />

                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                    <LanguageIcon />
                </IconButton>
            </Paper>
        </div>
    );
};
