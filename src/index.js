const http = require('http');
const { requestListener } = require('./requestListener');
const { ENV_VARIABLES, MESSAGES } = require('./constants');

const server = http.createServer(requestListener);
const port = ENV_VARIABLES.PORT;

server.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`${MESSAGES.STARTED_SERVER} ${port}`);
    }
});
