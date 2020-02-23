import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import UrlForm from "./components/url-form";
import UrlDialog from "./components/url-dialog";

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

    async function submit(url) {
        const res = await fetch("http://localhost:3000/url", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        const json = await res.json();
        console.info("json", json);
        setDialogOpen(true);
        setUrlToMinify(json.url);
        setMinifiedUrl(`http://localhost:8888/${json.identifier}`);
        let urls = localStorage.getItem("minified.urls");
        if (urls === undefined) {
            urls = [];
        }
        if (urls.length === 10) {
            urls.shift();
        }
        urls.push(i);
        localStorage.setItem("minified.urls", urls);
    }

    function handleClose() {
        setDialogOpen(false);
        setUrlToMinify("");
        setMinifiedUrl("");
        document.getElementById("url-minifier-form").reset();
    }

    const dialogProps = {
        open: dialogOpen,
        handleClose,
        urlToMinify, 
        minifiedUrl
    };

    return (

        <div className={classes.root}>
            <UrlForm submit={submit} />
            <UrlDialog {...dialogProps} />
        </div>
    );
};
