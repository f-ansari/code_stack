const {User, }= require('../models')
const { Op } = require('sequelize')
const user = require('./models/user')


const getAllDecks = async (req, res) =>{
    try{
} catch (error){
    }throw error
}

const createDecks = async (req, res) =>{
    try{
} catch (error){
    }throw error
}




const Search = async (req, res) => {
    try {
    const users = await User.findAll({
        attributes: ['handle'],
        limit: 10,
        where: { handle: { [Op.iLike]: `${req.query.searchQuery}%` } }
    })
    res.send(users)
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
    getAllDecks,
    // GetFriends, 
    createDecks,
    Search
}