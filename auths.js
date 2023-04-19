const jwt = require('jsonwebtoken');
const secret = 'eCommerseAPI';



// ================ Token creation =============================================================
module.exports.createAccessToken = (user)=>{

    // serve as payload
    // will contain the data that will be passed to other parts of our API
    const data = {
        _id:user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }


    // .sign() - from jwt package will generate a JSON web token
        // syntax: 
        // jwt.sign(payload, secretCode, options)

    return jwt.sign(data, secret, {})
};
// ================ end of Token creation =============================================================




// ================ Token Verification =============================================================
/*  Analogy
    - Received the gift and open the lock to verify if
    the sender is legitimate and the gift was not tempered.
*/
// Middleware functions have access with request object and 
// response object, and the next function indicates that we
// may proceed with the next step.

module.exports.verify = (request, response, next) =>{
    // The token is retrived from the request headers
    // This can be provided in postman under
    // Authorization > bearer Token
    
    let token = request.headers.authorization;
    
    //Token recieved and is not undefined.
    // console.log(token);
    
    if(typeof token !== "undefined"){
    // Retrives only token and removes the "Bearer" prefix
        token = token.slice(7,token.length )
        // console.log(token);
    
        return jwt.verify(token, secret, (error, data)=>{
            if(error){
                return response.send({auth: "Failed"})
            }
            else{

                /*
                The verify method will be used as middleware in
                the route to verify the token before proceeding
                to the function that invokes the controller function.
                */
                next()
            }
        })
    
    }

    // token does not exist
    else{
        return response.send({auth: "Failed"})
    }
    
};
// ================ end of Token Verification =============================================================





// =================== Token decryption =========================================================

/*
    Analogy
    - Open the gift and get the content.
*/

module.exports.decode = (token)=>{
    if (typeof token !== "undefined"){
        token = token.slice(7, token.length);

        return jwt.verify(token, secret, (error, data)=>{
            if(error){
                return null;
            }
            else{
                // decode method is used to obtain information from JWT.
                /**Syntax
                 * jwt.decode(token, [options])
                 */


                // return an object with access to the "payload"
                // property.
                return jwt.decode(token, {complete:true}).payload;
            }
        })
    }
    else{
        return null;
    }
}

// =================== end of Token decryption =========================================================


