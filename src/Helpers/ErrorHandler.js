const ApplicationError = require("./ApplicationError");

class ErrorHandler extends ApplicationError {
   constructor(message) {
      super(message || 'Server Error.', 400);
   }
}
module.exports = ErrorHandler;