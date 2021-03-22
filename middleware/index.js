const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 12
const SECRET_KEY = 'supersecret'

const HashPassword = async (password) => {
const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
return hashedPassword
}

const ComparePassword = async (providedPassword, storedPassword) => {
return await bcrypt.compare(providedPassword, storedPassword)
}

const StripHeaders = (req, res, next) => {
try {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
    res.locals.token = token
    return next()
    }
    return res.status(401).json({ msg: 'Unauthorized' })
} catch (error) {
    console.log(error)
    res.status(401).json({ msg: 'Unauthorized' })
}
}

const VerifyToken = (req, res, next) => {
const { token } = res.locals
try {
    let payload = jwt.verify(token, SECRET_KEY)
    res.locals.token = payload
    return next()
} catch (error) {
    return res.status(401).json({ msg: 'Unauthorized' })
}
}

const CreateToken = (payload) => {
let token = jwt.sign(payload, SECRET_KEY)
return token
}

module.exports = {
HashPassword,
ComparePassword,
StripHeaders,
VerifyToken,
CreateToken
}
