const { User } = require('../models')
const { ComparePassword, CreateToken, HashPassword } = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { handle: req.body.handle },
      raw: true
    })
    if (
      user &&
      (await ComparePassword(req.body.password, user.passwordDigest))
    ) {
      let payload = {
        id: user.id,
        handle: user.handle,
        avatar: user.avatar
      }
      let token = CreateToken(payload)
      return res.send({ user: payload, token })
    }
    return res.status(401).send({ msg: 'Unauthorized', reason: 'Login Failed' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { handle, password, email, name, avatarUrl } = req.body
    let passwordDigest = await HashPassword(password)
    const user = await User.create({
      email,
      handle,
      passwordDigest,
      name,
      avatarUrl
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  Register
}
