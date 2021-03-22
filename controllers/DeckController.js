const {Decks}=require('../models')
const { op }= require('sequelize')
// const decks = require('./model')


const getOneDecks = async (req, res) =>{
    try{
        const deckId = parseInt(req.params.deck_Id)
        const decks= await Decks.findByPk(deckId)
        res.send(decks)
} catch (error){
    throw error
    }
}

const createDecks = async (req, res) =>{
    try{
        let userId= parseInt(req.params.user_Id)
        let decksContent ={ userId, ...req.body}
        const decks = await Decks.create({ userId, ...req.body})
        res.send(decks)
} catch (error){
    throw error
}
    
}

const deleteDecks = async (req, res) =>{
    try{
        let deckId = parseInt(req.params.deck_Id)
        const del = await Decks.destroy({where: {id: deckId}})
        res.send({message: `Deleted deck with an id of ${deckId}`})
    }catch (error){
    
        throw error
    }
}

const updateDecks = async (req, res) => {
    try{
        let deckId = parseInt(req.params.deck_Id)
        const decks = await Decks.update(req.body, {
            where: {id: deckId}, 
            returning: true
        })
        res.send(decks)
    }
    catch(error){
        throw error
    } 
}

module.exports= {
    getOneDecks,
    createDecks,
    deleteDecks,
    updateDecks
}