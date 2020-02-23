import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import UrlForm from "./components/url-form";
import UrlDialog from "./components/url-dialog";
import UrlHistory from "./components/url-history";
import {addMinifiedUrl, getMinifiedUrls} from "./utils/localStorage";

const useStyles = makeStyles(() => ({
    root: {
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "20px 1fr 400px 1fr 20px",
        gridTemplateRows: "20px 1fr 100px 2fr 20px"
    }
}));

export default function UrlMinifierApp() {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [urlToMinify, setUrlToMinify] = useState("");
    const [minifiedUrl, setMinifiedUrl] = useState("");
    const [minifiedUrls, setMinifiedUrls] = useState(getMinifiedUrls());

    async function submit(url) {
        const res = await fetch("http://localhost:3000/url", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        const json = await res.json();
        setDialogOpen(true);
        setUrlToMinify(json.url);
        const minified = `http://localhost:8888/${json.identifier}`;
        setMinifiedUrl(minified);
        addMinifiedUrl({url: json.url, minified});
    }

    function handleCloseDialog() {
        setDialogOpen(false);
        setUrlToMinify("");
        setMinifiedUrl("");
        document.getElementById("url-minifier-form").reset();
        setMinifiedUrls(getMinifiedUrls());
    }

    const dialogProps = {
        open: dialogOpen,
        handleClose: handleCloseDialog,
        urlToMinify, 
        minifiedUrl
    };

    return (

        <div className={classes.root}>
            <UrlForm submit={submit} />
            <UrlDialog {...dialogProps} />
            <UrlHistory minifiedUrls={minifiedUrls}/>
        </div>
    );
};
