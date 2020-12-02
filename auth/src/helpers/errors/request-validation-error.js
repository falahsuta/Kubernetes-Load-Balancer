class ValidationError extends Error {
  statusCode = 400;

  constructor(reqValError) {
    super("invalid parameter found");
    this.name = this.constructor.name;
    this.reasons = reqValError;
    Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors() {
    return this.reasons.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}


module.exports = {
  ValidationError,
};
