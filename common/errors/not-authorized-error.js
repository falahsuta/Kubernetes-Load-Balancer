class NotAuthorizedError extends Error {
  statusCode = 401;

  constructor() {
    super("Not Authorized");
    this.name = this.constructor.name;
    this.reasons = "Not Authorized";
    Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors() {
    return [{ message: this.reasons }];
  }
}


module.exports = {
  NotAuthorizedError,
};
