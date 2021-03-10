var UserDetails = require('../models/UserDetailModel')
const jwt = require('njwt')



exports.loginUser = function (req, res){

    UserDetails.find({"creds.username": req.body.username}, function (err, data) {
        console.log(data)
        if(typeof data !== 'undefined' && data.length > 0){
            data = data[0];
            if(data.creds){
                if(data.creds.username == req.body.username && data.validPassword(req.body.password)){
                    console.log(data.roles)
                    const claims = { iss: 'chidha-survey-app', sub: req.body.username, roles:  data.roles}
                    const token = jwt.create(claims, 'top-secret-phrase')
                    token.setExpiration(new Date().getTime() + 60*5000)
                    res.status(200).send ( { access_token : token.compact() })
                }else {
                    res.status(401).send ({
                        message: "auth failed"
                    })
                }
            }
            
        } else if(err){
            res.status(500).send ({
                message: "Server Error :" + err
            })
        }else {
            res.status(400).send ({
                message: "User not found"
            }) 
        }

        
    })
}