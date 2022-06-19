const {
    NotAllRequiredFieldsExists, UserNotFoundError,
    UserIdNotInUuidFormatError, InvalidJsonError
} = require('../errors');
const {
    sendUserIdNotInUuidFormatResponse, sendNotFoundResponse,
    sendUnsupportedRouteResponse, sendOkWithJsonResponse,
    sendNotAllRequiredFieldsExistsResponse, sendInvalidJsonResponse
} = require('./_helpers');
const { updateUser } = require('../routeHandlers');
const { ROUTES } = require('../constants');
const { getBody } = require('../utils');

const putMethodHandle = async (request, response) => {
    const { url } = request;
    const [, apiPrefix, entity, id, rest] = url.split('/');

    if (apiPrefix !== ROUTES.PREFIX || rest !== undefined) {
        sendUnsupportedRouteResponse(response, url);
        return;
    }

    /* eslint-disable indent*/
    switch (entity) {
        case ROUTES.USER:
            try {
                const body = await getBody(request);
                const updatedBody = await updateUser(id, body);
                sendOkWithJsonResponse(response, updatedBody);
            } catch(err) {
                if (err instanceof UserIdNotInUuidFormatError) {
                    sendUserIdNotInUuidFormatResponse(response, id);
                } else if (err instanceof UserNotFoundError) {
                    sendNotFoundResponse(response, id);
                } else if (err instanceof NotAllRequiredFieldsExists) {
                    sendNotAllRequiredFieldsExistsResponse(response);
                } else if (err instanceof InvalidJsonError) {
                    sendInvalidJsonResponse(response);
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
    putMethodHandle
};
