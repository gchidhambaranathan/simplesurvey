const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var permissionSet = new Schema({
    name : {type: String, required: true, length: 25},
    permissions:{type:Array, required: true, length: 200}
}, { _id : false })

var rolePermissionModel = new Schema({
    role_id: {type:String, required: true},
    permission_set_items: [permissionSet]
}
);

const rolePermission = module.exports = mongoose.model('RolePermission',rolePermissionModel)