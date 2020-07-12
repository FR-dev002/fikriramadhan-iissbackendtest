const Tamu = require("./../Models/Tamu");


exports.getAll = (req, res) => {

   Tamu.find()
      .exec()
      .then(resp => {
         return res.status(200).json({
            'data': resp,
            'total': resp.length,
            'message': 'Success'
         });
      })
      .catch(error => {
         return res.status(400).json({
            'error': error.errmsg,
            'message': 'Fail'
         });
      });
}



exports.store = (req, res) => {
   const query = { name: req.body.name }
      // check duplicate name
   Tamu.findOne(query)
      .exec()
      .then(resp => {
         if (resp) {
            return res.status(400).json({
               'error': "Name already exsist",
               'message': 'Warning'
            });
         }
      })
      .catch(error => {
         return res.status(400).json({
            'error': error.errmsg,
            'message': 'Fail'
         });
      });


   const queryPhone = {
      phone_number: req.body.phoneNumber
   }

   Tamu.findOne(queryPhone)
      .exec()
      .then(resp => {
         if (resp) {
            return res.status(400).json({
               'error': "Phone Number already exsist",
               'message': 'Warning'
            });
         }
      })
      .catch(error => {
         return res.status(400).json({
            'error': error.errmsg,
            'message': 'Fail'
         });
      });


   //   construct data
   const data = {
      'name': req.body.name,
      'address': req.body.address,
      'status': req.body.status,
      'phone_number': req.body.phoneNumber
   }

   //    store into database
   const register = new Tamu(data);
   register
      .save()
      .then(result => {
         res.status(200).json({
            'data': result,
            'message': 'Success'
         });
      })
      .catch(error => {
         return res.status(409).json({
            'error': error.errmsg,
            'message': 'Fail'
         });
      });
}



// Get one Tamu
exports.getOne = (req, res) => {
   const query = { _id: req.params.id }

   if (req.params.id === '') {
      return res.status(422).json({
         'error': "User id required",
         'message': 'Warning'
      });
   }

   Tamu.findOne(query)
      .exec()
      .then(resp => {
         return res.status(200).json({
            'data': resp,
            'message': 'Success'
         });
      })
      .catch(error => {
         return res.status(400).json({
            'error': error.errmsg,
            'message': 'Fail'
         });
      });
}



// Update data
exports.update = (req, res) => {
   var id = req.params.id;
   var data = {
      'name': req.body.name,
      'phone_number': req.body.phoneNumber,
      'address': req.body.address,
      'status': req.body.status
   }

   // check name
   Tamu.find({
         '_id': { $ne: id },
         $and: [{ 'name': { $eq: data.name } }]
      })
      .exec()
      .then(resp => {
         if (resp.length > 0) {
            return res.status(400).json({
               'error': "Name already exsist",
               'message': 'Warning'

            });
         }

         Tamu.find({
               '_id': { $ne: id },
               $and: [{ 'phone_number': { $eq: data.phone_number } }]
            })
            .exec()
            .then(resp => {

               if (resp.length > 0) {
                  return res.status(400).json({
                     'error': "Phone Number already exsist",
                     'message': 'Warning'
                  });
               }

               Tamu.update({ '_id': id }, { $set: data }, )
                  .exec()
                  .then(resp => {
                     if (resp.ok) {
                        return res.status(200).json({
                           'data': resp,
                           'status': 'Data Updated'
                        });
                     }
                  });

            })
      })
      .catch(error => {
         return res.status(400).json({
            'error': error.errmsg,
            'message': 'Fail'
         });
      });
}



// Delete Data
exports.delete = (req, res) => {
   var id = req.params.id;
   if (id === '') {
      return res.status(422).json({
         'error': "User id required",
         'message': 'Warning'
      });
   }

   Tamu.findOneAndUpdate({ '_id': id, 'status': { $ne: true } }, { $set: { name: 'zzzzz' } }, { new: true })
      .exec()
      .then(resp => {
         if (resp) {
            return res.status(200).json({
               'data': resp,
               'message': 'Success'
            });
         } else {
            return res.status(200).json({
               'message': 'Tamu Seudah Melakukan Verifikasi Kehadiran'
            });
         }

      })
      .catch(errors => {
         return res.status(400).json({
            'error': error.errmsg,
            'message': 'Fail'
         });
      });
}