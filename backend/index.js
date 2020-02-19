const express = require('express')
const app = express();
const jsonParser = require('body-parser').json();
const cors = require('cors')
const { check, validationResult } = require('express-validator');
const { getIdentifier } = require("./identifier"); 

var corsOptions = {
    origin: 'http://localhost:8888', // TODO get from env/docker
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// TODO get from env/docker
const PORT = 3000;
const ADRESS = "http://localhost";

const identifierToUrl = new Map();

app.use(jsonParser);
app.use(cors(corsOptions));

app.post("/url", [
    check("url").isURL()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { body: { url } } = req; 
    console.info("YOu submitted ", url);
    // Check if in redis else create identifier
    const identifier = getIdentifier(url);

    identifierToUrl.set(identifier, url);
    // Save to redis
    res.json({url, minifiedUrl: `${ADRESS}:${PORT}/${identifier}`});
});

app.get("/:identifier", (req, res) => {
    const { params: { identifier } } = req;
    
    // Check if in redis else
    // return res.status(404).send("No match =(")
    console.info("identifier", identifier);
    const redirectUrl = identifierToUrl.get(identifier);
    return res.redirect(301, redirectUrl);
});

app.listen(PORT, () => console.info(`Listening on ${PORT}`));
