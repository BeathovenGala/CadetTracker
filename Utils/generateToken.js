const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret_super_key' ;

const generateToken = (id,role) => {
    // jwt.sign() creates a new token.
    // The first argument is the payload (data to store in the token).
    // The second argument is the secret key used to sign the token.
    // The third is an options object, we set an expiration time of 1 hour.
    return jwt.sign(//JWT consists of three parts, separated by dots (.) once they are converted       //E.G. ---- Formula:HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret) The final JWT is the concatenation of these three encoded parts, separated by periods: [Header].[Payload].[Signature]
                ////Header: Contains the token type (JWT) and the signing algorithm //Payload: Contains the "claims" or statements about an entity (like a user) and additional data. Claims can include the user ID, username, and an expiration time. //Signature: Created by taking the encoded header, the encoded payload, a secret key, and the algorithm specified in the header. The server uses this signature to verify that the token hasn't been tampered with
        { id,role }, //Payload
        JWT_SECRET, //Secret Key Only  server should know this key
        {expiresIn: '1h'}//Options,,, configure the token's behavior
    );
}; 

// We export the function so it can be used in other files.
module.exports = generateToken;






