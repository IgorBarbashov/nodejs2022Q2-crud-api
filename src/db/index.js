const { ENTITIES } = require('../constants');
const { user } = require('./user');

const db = {
    [ENTITIES.USER]: user
};

module.exports = {
    db
};
