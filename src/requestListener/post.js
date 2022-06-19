const { NotAllRequiredFieldsExists, InvalidJsonError } = require('../errors');
const {
    sendUnsupportedRouteResponse, sendCreatedWithJsonResponse,
    sendNotAllRequiredFieldsExistsResponse, sendInvalidJsonResponse
} = require('./_helpers');
const { createUser } = require('../routeHandlers');
const { ROUTES } = require('../constants');
const { getBody } = require('../utils');

const postMethodHandle = async (request, response) => {
    const { url } = request;
    const [, apiPrefix, entity, rest] = url.split('/');
    
    if (apiPrefix !== ROUTES.PREFIX || rest !== undefined) {
        sendUnsupportedRouteResponse(response, url);
        return;
    }

    /* eslint-disable indent*/
    switch (entity) {
        case ROUTES.USER:
            try {
                const body = await getBody(request);
                const createdBody = await createUser(body);
                sendCreatedWithJsonResponse(response, createdBody);
            } catch(err) {
                if (err instanceof NotAllRequiredFieldsExists) {
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
    postMethodHandle
};
