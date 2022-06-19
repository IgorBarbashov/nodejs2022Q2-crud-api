const { v4: uuidv4 } = require('uuid');
const { db } = require('../db');
const { isIdInUuidFormat, isAllRequiredFieldsExists } = require('../validation');
const {
    UserIdNotInUuidFormatError, UserNotFoundError,
    NotAllRequiredFieldsExists
} = require('../errors');
const { ENTITIES } = require('../constants');

let { data, model } = db[ENTITIES.USER];

const getAllUsers = async () => {
    return await new Promise(resolve => { // aka async request to DB
        setTimeout(() => {
            resolve(data);
        }, 300);
    });
};

const getUserById = async (id) => {
    const isIdMatchUuid = isIdInUuidFormat(id);
    if (!isIdMatchUuid) {
        throw new UserIdNotInUuidFormatError();
    }
    const user = await new Promise(resolve => { // aka async request to DB
        setTimeout(() => {
            resolve(data.find(el => el.id === id));
        }, 300);
    });
    if (!user) {
        throw new UserNotFoundError(id);
    }
    return user;
};

const createUser = async (body) => {
    const isRequiredFieldsExists = isAllRequiredFieldsExists(body, model);
    if (!isRequiredFieldsExists) {
        throw new NotAllRequiredFieldsExists();
    }
    return await new Promise(resolve => { // aka async request to DB
        setTimeout(() => {
            const id = uuidv4();
            const savedBody = { ...body, id };
            data.push(savedBody);
            resolve(savedBody);
        }, 300);
    });
};

const updateUser = async (id, body) => {
    const isIdMatchUuid = isIdInUuidFormat(id);
    if (!isIdMatchUuid) {
        throw new UserIdNotInUuidFormatError();
    }
    const isRequiredFieldsExists = isAllRequiredFieldsExists(body, model);
    if (!isRequiredFieldsExists) {
        throw new NotAllRequiredFieldsExists();
    }
    const entityIndex = data.findIndex(el => el.id === id);
    if (entityIndex === -1) {
        throw new UserNotFoundError(id);
    }
    const [updatedUser, updateEntities] = await new Promise(resolve => { // aka async request to DB
        setTimeout(() => {
            const newUser = { ...body, id };
            const newEntities = data.filter(el => el.id !== id);
            newEntities.push(newUser);
            resolve([newUser, newEntities]);
        }, 300);
    });
    data = updateEntities;
    return updatedUser;
};

const deleteUser = async (id) => {
    const isIdMatchUuid = isIdInUuidFormat(id);
    if (!isIdMatchUuid) {
        throw new UserIdNotInUuidFormatError();
    }
    const entitiesWithoutDeleted = await new Promise(resolve => { // aka async request to DB
        setTimeout(() => {
            resolve(data.filter(el => el.id !== id));
        }, 300);
    });
    if (entitiesWithoutDeleted.length === data.length) {
        throw new UserNotFoundError(id);
    }
    data = entitiesWithoutDeleted;
    return entitiesWithoutDeleted;
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser
};
