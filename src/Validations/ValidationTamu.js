const { use } = require("../routes");

exports.validationAddTamu = (req, res, next) => {
   // check username
   req.check("name", "name must be filled").notEmpty();
   req
      .check(
         "name",
         "names must between 3 to 50 character, use uppercase letters, numbers and special characters"
      )
      .isLength({
         min: 3,
         max: 50
      });

   // check password
   req.check("address", "address must be filled").notEmpty();
   req.check("address", "address must between 5 to 200 charackter").isLength({
      min: 5,
      max: 200
   });


   // check phoneNumber
   req.check("phoneNumber", "phoneNumber must be filled").notEmpty();
   req.check("phoneNumber", "phoneNumber min 5 max 13 ").isLength({
      min: 5,
      max: 13
   });

   req.check("status", "status must be filled").notEmpty();
   req.check("status", "status True or False").isBoolean();

   const errors = req.validationErrors();
   if (errors) {
      let error = errors.map(error => {
         return {
            [error.param]: error.msg
         };
      });
      return res.status(422).json(error);
   }
   next();
};