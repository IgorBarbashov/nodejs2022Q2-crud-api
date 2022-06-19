const { UserIdNotInUuidFormatError, UserNotFoundError } = require('../errors');
const {
    sendUnsupportedRouteResponse, sendOkWithJsonResponse,
    sendUserIdNotInUuidFormatResponse, sendNotFoundResponse
} = require('./_helpers');
const { getAllUsers, getUserById } = require('../routeHandlers');
const { ROUTES } = require('../constants');

const getMethodHandle = async (request, response) => {
    const { url } = request;
    const [, apiPrefix, entity, id, rest] = url.split('/');

    if (apiPrefix !== ROUTES.PREFIX || rest !== undefined || (id === '' && rest === undefined)) {
        sendUnsupportedRouteResponse(response, url);
        return;
    }

    /* eslint-disable indent*/
    switch (entity) {
        case ROUTES.USER:
            try {
                const body = await (id === undefined ? getAllUsers() : getUserById(id));
                sendOkWithJsonResponse(response, body);
            } catch(err) {
                if (err instanceof UserIdNotInUuidFormatError) {
                    sendUserIdNotInUuidFormatResponse(response, id);
                } else if (err instanceof UserNotFoundError) {
                    sendNotFoundResponse(response, id);
                }
            }
            break;
        default:
            sendUnsupportedRouteResponse(response, url);
            break;
    }
    /* eslint-enable indent*/
};

module.exports = {
    getMethodHandle
};
