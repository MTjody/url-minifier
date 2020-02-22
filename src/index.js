import "@babel/polyfill";
import React from "react";
import ReactDom from "react-dom";
import UrlMinifier from "./url-minifier-app";

ReactDom.render(
    <UrlMinifier />,
    document.getElementById("url-minifier-root")
);
