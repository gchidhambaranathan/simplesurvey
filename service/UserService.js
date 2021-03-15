const UserDetails = require('../models/UserDetailModel')

exports.deleteUserById = function deleteUserById(req, res) {
    UserDetails.findByIdAndDelete(req.params.uid).then(data => {
        if(!data) {
            res.status(404).send("Not found") 
        }else {
            
            res.status(204).send("Deleted")
        }
          
       });
   }


   exports.registerUser = function registerUser(req, res){
    var user = new UserDetails({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        country:req.body.country,
        roles: req.body.roles,
        creds: {
            username: req.body.username
           
        }
    });
    user.setPassword(req.body.password)
    
    UserDetails.create(user).then(data => {
        data.creds = undefined;
        res.status(201).send(data)
    }).catch(error => {
        res.status(500).send({
            errorMessage: error
        })
    })
   }

   exports.getExistingUser = function getExistingUser(req, res){
    UserDetails.findById(req.params.uid).then(data => {
        if(!data){
            res.status(404).send( {
                messgae: "No user exists"
            })
            
        }else {
            data.creds = undefined;
            res.status(200).send(data)
        }
        
    }).catch(error => {
        res.status(500).send({
            errorMessage: error
        })
    })
   }

   exports.getAllUsers = function getAllUsers(req, res){
    const filter = {};
    UserDetails.find(filter, function (err, data) {
        if(data){
            data.forEach( user => {
                user.creds = undefined
            })
            res.status(200).send(data)
        }else if(err){
            res.status(500).send({
                errorMessage: err
            })
        }
        
    });
   }

   exports.updateUser = function updateUser(req, res){
        UserDetails.findByIdAndUpdate(req.params.uid, req.body, { useFindAndModify: false }).then(data => {
            if(!data){
                res.status(500).send({
                    messgae: "Unable to update"
                })
            }else {
                res.status(200).send({
                    messgae: "Updated Successfully"
                })
            }
        }).catch(err => {
            res.status(500).send({
            errorMessage: "Error updating user with id=" + req.params.uid + err
            });
        }); 
   }