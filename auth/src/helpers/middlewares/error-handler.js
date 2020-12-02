const ErrorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    if (!err.statusCode) {
      res.status(500).send("Something Wrong");
    }
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
};

module.exports = ErrorHandler;
