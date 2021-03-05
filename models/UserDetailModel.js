const mongoose = require('mongoose');
var crypto = require('crypto'); 

var Schema = mongoose.Schema;

var UserDetailsSchema = new Schema ({
    first_name : {type: String, required: true, maxlength: 100},
    last_name : {type: String, required: true, maxlength: 100},
    email: {type: String, required: true, maxlength: 100},
    mobile:{type: Number, required: true, maxlength: 10},
    country:{type: String, required:true, length: 100},
    roles: {type: Array, require:true},
    creds: {
        username: {type: String, required: true, maxlength: 25},
        hash:{type: String},
        salt: {type: String}
    }
});

// Virtual for author's full name
UserDetailsSchema
.virtual('name')
.get(function () {
  return this.first_name + ', ' + this.Last_name;
});

UserDetailsSchema.methods.setPassword = function(password){
    this.creds.salt = crypto.randomBytes(16).toString('hex'); 
    this.creds.hash = crypto.pbkdf2Sync(password, this.creds.salt,  
        1000, 64, `sha512`).toString(`hex`); 
}


UserDetailsSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
        this.creds.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.creds.hash === hash; 
}; 

const UserDetails = module.exports = mongoose.model('UserDetails',UserDetailsSchema)
