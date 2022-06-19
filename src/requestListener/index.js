const { getMethodHandle } = require('./get');
const { postMethodHandle } = require('./post');
const { putMethodHandle } = require('./put');
const { deleteMethodHandle } = require('./delete');
const { HTTP_METHODS, MESSAGES } = require('../constants');

const requestListener = async (request, response) => {
    const { method } = request;

    try {
        /* eslint-disable indent*/
        switch (method) {
            case HTTP_METHODS.GET:
                await getMethodHandle(request, response);
                break;
            case HTTP_METHODS.POST:
                await postMethodHandle(request, response);
                break;
            case HTTP_METHODS.PUT:
                await putMethodHandle(request, response);
                break;
            case HTTP_METHODS.DELETE:
                await deleteMethodHandle(request, response);
                break;
            default:
                response.statusCode = 400;
                response.write(`${MESSAGES.HTTP_UNSUPPORTED_METHOD}: ${method}`);
                response.end();
                break;
        }
        /* eslint-enable indent*/
    } catch ({ message }) {
        response.statusCode = 500;
        response.write(`${MESSAGES.INTERNAL_SERVER_ERROR}${message ? `: ${message}` : ''}`);
        response.end();
    }
};

module.exports = {
    requestListener
};
