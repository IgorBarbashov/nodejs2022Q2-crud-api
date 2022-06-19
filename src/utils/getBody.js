const { InvalidJsonError } = require('../errors');

const getBody = (request) => {
    return new Promise((resolve, reject) => {
        const body = [];
        request.on('data', chunk => {
            body.push(chunk);
        });
        request.on('end', () => {
            const receivedBody = Buffer.concat(body).toString();
            let parsedBody;
            try {
                parsedBody = JSON.parse(receivedBody);
            } catch {
                reject(new InvalidJsonError());
            }
            resolve(parsedBody);
        });
    });
};

module.exports = {
    getBody
};
