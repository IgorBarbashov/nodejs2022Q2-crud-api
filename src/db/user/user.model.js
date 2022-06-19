const { MODEL_TYPES } = require('../../constants');

const model = {
    id: {
        type: MODEL_TYPES.STRING
    },
    name: {
        type: MODEL_TYPES.STRING,
        required: true
    },
    age: {
        type: MODEL_TYPES.NUMBER,
        required: true
    },
    hobbies: {
        type: [MODEL_TYPES.ARRAY, MODEL_TYPES.STRING],
        required: true
    }
};

module.exports = {
    model
};
