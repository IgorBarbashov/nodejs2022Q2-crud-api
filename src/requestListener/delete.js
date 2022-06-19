const { UserIdNotInUuidFormatError, UserNotFoundError } = require('../errors');
const {
    sendUnsupportedRouteResponse, sendDeletedResponse,
    sendUserIdNotInUuidFormatResponse, sendNotFoundResponse
} = require('./_helpers');
const { deleteUser } = require('../routeHandlers');
const { ROUTES } = require('../constants');

const deleteMethodHandle = async (request, response) => {
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
                await deleteUser(id);
                sendDeletedResponse(response);
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
    deleteMethodHandle
};
