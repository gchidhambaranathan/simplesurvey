const jwt = require('njwt')
const RolePermission = require('../models/RolePermission')


exports.checkAuthenticated = function(req, res, funName, doAction){
    var authHeader = req.headers['authorization'];
    if(authHeader){
        TokenArray = authHeader.split(" ");
        var token = TokenArray[1]
        if(token){
            try {

                var jwtToken = jwt.verify(token,'top-secret-phrase');
                parseJWT(jwtToken, req, res, funName, doAction)
            } catch(e) {
                console.log('error...');
                console.log(e);
                unAuthorize(res)
            }

        }else {
            console.log("No bearer token attached..")
            unAuthorize(res)
        }
    }else {
        console.log("No auth header attached..")
        unAuthorize(res)
    }
}

function unAuthorize(res) {
    res.status(401).send({
        errorMessage: "The user is not authorized"
    })

}

function unAuthorizeResponse (res) {
    res.status(403).send({
        errorMessage: "The user is forbidden"
    })
}

function parseJWT(parsedJwt,  req, res, funName, doAction){
    var forbidden = true;
                  
    var roleclaiams = parsedJwt.body.roles; // Will contain the header and 
    console.log('Roles in JWT '+ roleclaiams)
    
    RolePermission.find({role_id: roleclaiams}).then(data =>{
        
        permissionsFound = parsePermissions(data);
        console.log(permissionsFound)
       
        permissionsDistinct = Array.from(new Set(permissionsFound))  
        console.log('Permission in Database by all roles'+ permissionsDistinct)
      
        if(checkForbidden(funName)){
            authStaus = 'Forbidden'
            unAuthorizeResponse(res)
        }else {
            doAction(req, res);
        }


    });
}


function parsePermissions(roleData){
    let permissionsParsed = [] ;
    try {
        for(i=0;i<roleData.length;i++){
            item = roleData[i]
            console.log(item)
            if(item.permission_set_items){
                permsetitems = item.permission_set_items
                console.log(permsetitems.length)
                for(j=0;j<permsetitems.length;j++){
                    permset = permsetitems[j]
                    console.log('paramset'+ permset)
                    if(permset.permissions){
                        permdata = permset.permissions;
                        console.log(permdata.length)
                        for(k=0;k<permdata.length;k++){
                            perm = permdata[k]
                            console.log(perm)
                            permissionsParsed.push(perm)
                        }
                    }
                }
            }
           
        }
    }catch(err){
        console.log('Error parsing roles '+ err)
    }
    return permissionsParsed;
}



function checkForbidden(funcPerm){
    var isForbidden = true;
    console.log("Total permissions to check" +permissionsDistinct.length + " against "+ funcPerm)
    for(i=0;i<permissionsDistinct.length;i++){
        roleComp = permissionsDistinct[i]
        if(roleComp === funcPerm){
            console.log("contains")
            isForbidden = false;
          break;
        }
    }
    return isForbidden;
}

