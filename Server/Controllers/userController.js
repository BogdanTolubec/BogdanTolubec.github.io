const ApiErrors = require("../errors/apiErrors")
const bcrypt = require('bcrypt')
const {User, Watchlist} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class userController {
    async registration(req, res, next){
        try{
        const {email, password, role} = req.body

        if(!email || !password){
            return next(ApiErrors.badRequest('Invalid email or password!'))
        }

        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiErrors.badRequest('User is already exists'))
        }

        const hashPassword = await bcrypt.hash(password, 7)

        const user = await User.create({email, password: hashPassword, role})
        const watchlist = await Watchlist.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    } catch(e){
        next(ApiErrors.badRequest(e.message))
    }
    }

    async login(req, res, next){
        const {email, password} = req.body
        const authUser = await User.findOne({where: {email}})

        if(!authUser){
            return next(ApiErrors.badRequest('User not exists!'))
        }

        if(!email || !password){
            return next(ApiErrors.badRequest('Invalid email or password!'))
        }

        let checkPassword = bcrypt.compareSync(password, authUser.password)
        if(!checkPassword){
            return next(ApiErrors.badRequest('Invalid password!'))
        }

        const token = generateJwt(authUser.id, authUser.email, authUser.role)
        return res.json({token})
    }

    async auth(req, res, next){
        const newToken = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({newToken})
    }
}

module.exports = new userController()