const UserDetails = require('../models/UserDetailModel')

exports.deleteUserById = function deleteUserById() {
    UserDetails.findByIdAndDelete(req.params.uid).then(data => {
        if(!data) {
            res.status(404).send("Not found") 
        }else {
            
            res.status(204).send("Deleted")
        }
          
       });
   }