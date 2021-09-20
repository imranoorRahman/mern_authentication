const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (error, req, res, next) => {
  // let error = { ...error };
  // error.message
  //   console.log(`Error:: >${error}<`);

  if (error.code === 11000) {
    const message = `Duplicate Field Value Entered`;
    error = new ErrorResponse(message, 400);
  }

  if (error.name == "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.status || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
