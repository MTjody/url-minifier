# Url Minifier
A simple React application which takes a long Url, and converts it to a minfied Url. The API creates a SHA256 hash of the Url input, converts it to alphanumeric characters and uses the six first characters as an identifier. This gives the minfified Urls of a collision probability of 1 in 62^6 (sufficiently small for this app).

## Running locally
The application is currently written for a local environment. Run the following to get going

    $ npm i             # Installs all dependencies
    $ npm start         # Start the web server. Use the web app address in the stdout.
    $ npm run server    # Starts the API server.

## Testing
Simply run the below command which runs both unit- and E2E tests.

    $ npm t

## TODO
- Cypress
- Refactor FE Code
- Remember urls between browser sessions

## Omitted
- Linter + Formatted for standard code formatting.
- Production web server e.g. NGINX.
- Proptypes for React Components
- DB store (e.g. Redis key store should do fine)
- Docker w compose setup
- More love for styling the web app
- Proper .env handling for e.g. addresses, ports
