const RolePermission = require('../models/RolePermission')


exports.createRolePermissions = function(req, res){
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
    var role = req.params.roleid
    var filter = {role_id : role}
    console.log(filter)
    RolePermission.find(filter, function(err, data){

        if(data){
            res.status(200).send(data)
        }else if(err){
            res.status(500).send({
                errorMessage: err
            })
        }
    })
    
}


