//Unsupported (404) routes

const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.orginalUrl}`);
  res.status(404);
  next(error);
};

//Middleware to handle Errors

const errorHandler = (error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknow error occured" });
};

modules.export = { notFound, errorHandler };
