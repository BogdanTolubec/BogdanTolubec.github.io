const jwt = require('jsonwebtoken')

module.exports = function(role) { //Admin role has no limits
    return function(req, res, next) {if(req.method === "OPTIONS"){
            next()
        }

        try{
            const token = req.headers.authorization.split(' ')[1] //second because 1st is the type of token(bearer)

            if(!token){
                return res.status(401).json({message: "User unauthorised!"})
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role !== role && decoded.role !== "ADMIN"){
                return res.status(403).json({message: 'Accsess denied! Need role : ' + role +'!'})
            }

            req.user = decoded
            next()
        } catch(e){
            res.status(401).json({message: "User unauthorisated! " + e})
        }
    }
}