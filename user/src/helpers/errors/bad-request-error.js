class BadRequestError extends Error {
  statusCode = 400;

  constructor(customMessage) {
    super(customMessage);
    this.name = this.constructor.name;
    this.reasons = customMessage;
    Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors() {
    return [{ message: this.reasons }];
  }
}


module.exports = {
  BadRequestError,
};
