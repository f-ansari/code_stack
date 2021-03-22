const {Decks}=require('../models')
const { op }= require('sequelize')
const decks = require('./model')


const getAllDecks = async (req, res) =>{
    try{
        const decks= await Decks.findByPk(req.params.deckId)
        res.send(decks)
} catch (error){
    }throw error
}

const createDecks = async (req, res) =>{
    try{
        let decksContent = { deckId, ...req.body}
        const decks = await Decks.create(decksContent)
        res.send(decks)
} catch (error){
    }throw error
}

const deleteDecks = async (req, res) =>{
    try{
        let deckId = parseInt(req.params.deckId)
        const del = await Decks.destroy({where: {id: deckId}})
        res.send({message: `Deleted deck with an id of ${deckId}`})
    }catch (error){
    }throw error
}

const updateDecks = async (req, res) => {
    try{
        let deckId = parseInt(req.params.userId)
        const decks = await Decks.update(req.body, {
            where: {id: deckId}, 
            returning: true
        })
        res.send(updateDecks)
    }
    catch(error){
    }throw error 
}

module.exports= {
    getAllDecks,
    createDecks,
    deleteDecks,
    updateDecks
}