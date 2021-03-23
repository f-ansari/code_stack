const { User } = require('../models')
const { HashPassword } = require('../middleware')

const getOneUser = async (req, res) => {
  try {
    let handle = parseInt(req.params.handle)
    const user = await User.findOne(handle)
    res.send(user)
  } catch (error) {
    throw error
  }
}

const createUser = async (req, res) => {
  try {
    let passwordDigest = await HashPassword(req.body.password)
    let newUser = await User.create({
      passwordDigest: passwordDigest,
      ...req.body
    })
    res.send(newUser)
  } catch (error) {
    throw error
  }
}

const updateUser = async (req, res) => {
  try {
    let updated = await User.update(req.body, {
      where: { handle: req.params.handle },
      returning: true
    })
    res.send(updated)
  } catch (error) {
    throw error
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { handle: req.params.handle } })
    res.send(`User with handle ${req.params.handle} deleted`)
  } catch (error) {
    throw error
  }
}

// const GetFriends = async (req, res) => {

//     try {
//     const { token } = res.locals
//     const user = await User.findByPk(token.id)
//     const friends = await User.findAll({
//         include: [{
//             model: User,
//             as: 'following',
//             attributes:[ 'handle'],
//             through:{attributes: []}
//         }],
//         order:[['createdAt', 'DESC' ]],
//         where: {id: token.id}

//     })
//     res.send({following: true})
//     } catch (error) {
//     throw error
//     }
// }

module.exports = {
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}
