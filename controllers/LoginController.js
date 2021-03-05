var UserDetails = require('../models/UserDetailModel')
const jwt = require('njwt')



exports.loginUser = function (req, res){

    UserDetails.find({"creds.username": req.body.username}, function (err, data) {
        if(data){
            data = data[0];
            if(data.creds.username){
                if(data.creds.username == req.body.username && data.validPassword(req.body.password)){
                    console.log(data.roles)
                    const claims = { iss: 'chidha-survey-app', sub: req.body.username, roles:  data.roles}
                    const token = jwt.create(claims, 'top-secret-phrase')
                    token.setExpiration(new Date().getTime() + 60*1000)
                    res.status(200).send ( { access_token : token.compact() })
                }else {
                    res.status(401).send ({
                        message: "auth failed"
                    })
                }
            }
            
        }
    })
}