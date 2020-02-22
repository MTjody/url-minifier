const app = require('express')();
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
    return res.status(200).json({ url, identifier });
});

app.get("/url/:identifier", (req, res) => {
    const { params: { identifier } } = req;

    console.info("identifier", identifier);
    const url = identifierToUrl.get(identifier);
    return url ? res.status(200).json({ url, identifier }) :
        res.status(404).send("No match =(");
});

app.listen(PORT, () => console.info(`API listening on ${PORT}`));
