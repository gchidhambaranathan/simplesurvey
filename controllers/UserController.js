var UserDetails = require('../models/UserDetailModel')
var AuthService = require('../auth/AuthCheck');
var UserService = require('../service/UserService')

exports.registerUser = function(req, res){
    AuthService.checkAuthenticated(req, res,'CUSER', UserService.registerUser)
    //UserService.registerUser(req, res)
  
}

exports.getExistingUser = function(req, res){
   AuthService.checkAuthenticated(req, res, 'GUSER', UserService.getExistingUser)
}

exports.deleteUser = function(req, res){
    AuthService.checkAuthenticated(req, res,'DUSER', UserService.deleteUserById)
}

exports.getAllUsers = function(req, res){
    AuthService.checkAuthenticated(req, res, 'GAUSER', UserService.getAllUsers)   
}

exports.updateUser = function(req,res){
    AuthService.checkAuthenticated(req, res, 'UUSER', UserService.updateUser)
}