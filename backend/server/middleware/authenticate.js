require('dotenv').config();
const jwt = require('jsonwebtoken')

const verifyAuth = async (req, res, next)=>{
    const token = req.header("access-token")
    if(!token){
        return res.status(401).send({error: 'Access denied'})
    }
    try {
        const verified = jwt.verify(token,process.env.ACCESS_TOKEN_KEY )
        req.authVerified = verified
        next()
    } catch (error) {
        res.status(401).send({error: 'Access denied: Invalid token'})
    }
}

module.exports = verifyAuth