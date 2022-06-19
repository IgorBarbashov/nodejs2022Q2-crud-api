class CustomErrors extends Error {
    constructor(message) {
        super(message);
        this.message = `REST API error: ${message ? message : 'unknown'}`;
    }
}

class UserIdNotInUuidFormatError extends CustomErrors {
    constructor() {
        super('user id doesn\'t match uuid format');
        this.name = 'IdNotInUuidFormatError';
    }
}

class UserNotFoundError extends CustomErrors {
    constructor(id) {
        super(`user with id: ${id} not found`);
        this.name = 'UserNotFoundError';
    }
}

class NotAllRequiredFieldsExists extends CustomErrors {
    constructor() {
        super('Not all required fields exists');
        this.name = 'NotAllRequiredFieldsExists';
    }
}

class InvalidJsonError extends CustomErrors {
    constructor() {
        super('Invalid JSON');
        this.name = 'InvalidJsonError';
    }
}

module.exports = {
    UserIdNotInUuidFormatError,
    UserNotFoundError,
    NotAllRequiredFieldsExists,
    InvalidJsonError
};
