const RolePermission = require('../models/RolePermission')


exports.createRolePermissions = function createRolePermissions(req, res) {
    var permissionSets = [];

    req.body.permissionSetItems.forEach(element => {
        var permissionSet = {
            name: element.name,
            permissions:element.permissions
           
        }
        permissionSets.push(permissionSet)
    });

    console.log(permissionSets)

    var rolePermission = new RolePermission({
        role_id : req.body.roleId,
        permission_set_items: permissionSets
    })

    RolePermission.create(rolePermission).then(data => {
        res.status(201).send(data)
    }).catch(error => {
        res.status(500).send({
            errorMessage: error
        })
    })
}

exports.getPermissionByRole = function(req, res){
   RolePermission.findById(req.params.uid).then(data => {
    if(!data){
        res.status(404).send( {
            messgae: "No Role exists"
        })
        
    }else {
       res.status(200).send(data)
    }
    
}).catch(error => {
    res.status(500).send({
        errorMessage: error
    })
})
}


exports.getAllRolePermissions = function getAllRolePermissions (req, res){
    const filter = {}

    RolePermission.find(filter, (err, data) => {

        if(data){
            res.status(200).send(data)
        }else if(err){
            res.status(500).send({
                errorMessage : "Unable to fetch all role permissions"
            })
        }
    })

}

exports.deletePermissionByRole = function deletePermissionByRole(req, res){
    RolePermission.findByIdAndDelete(req.params.uid).then(data => {

        if(!data) {
            res.status(404).send({
                messgae : 'not found'
            })
        }else {
           res.status(204).send({
               messgae : 'Deleted'
           }) 
        }
    })
}

exports.updateRolePermission = function updateRolePermission(req, res){
    RolePermission.findByIdAndUpdate(req.params.uid, req.body, { useFindAndModify: false }).then(data => {
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
        errorMessage: "Error updating Tutorial with id=" + req.params.uid + err
        });
    });
}