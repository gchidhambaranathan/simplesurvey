const RolePermissionService = require('../service/RolePermissionService')
const AuthService = require('../auth/AuthCheck')

exports.createRolePermissions = function(req, res){
    //RolePermissionService.createRolePermissions(req, res)
    AuthService.checkAuthenticated(req, res,'CROLEPERM', RolePermissionService.createRolePermissions)
}

exports.getPermissionByRole = function(req, res){
   AuthService.checkAuthenticated(req, res, 'GROLEPERM', RolePermissionService.getPermissionByRole)  
}

exports.getAllRolePermissions = function(req, res){
    AuthService.checkAuthenticated(req, res, 'GAROLEPERM', RolePermissionService.getAllRolePermissions)
}

exports.deletePermissionByRole = function(req, res){
    AuthService.checkAuthenticated(req, res, 'DROLEPERM', RolePermissionService.deletePermissionByRole)
}

exports.updateRolePermission = function(req, res){
    AuthService.checkAuthenticated(req, res, 'UROLEPERM', RolePermissionService.updateRolePermission)
}


