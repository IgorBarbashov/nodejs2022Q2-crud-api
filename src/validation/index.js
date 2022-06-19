const { validate } = require('uuid');

const isIdInUuidFormat = (id) => validate(String(id));

const isAllRequiredFieldsExists = (entity, model) => {
    const requiredFields = Object.entries(model)
        .filter(([, value]) => value.required)
        .map(el => el[0]);
    const entityFields = Object.keys(entity);
    return requiredFields.every(el => entityFields.includes(el));
};

module.exports = {
    isIdInUuidFormat,
    isAllRequiredFieldsExists
};
