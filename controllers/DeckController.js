const {Deck}=require('../models')
const { op }= require('sequelize')
// const decks = require('./model')


const getOneDecks = async (req, res) =>{
    try{
        const deckId = parseInt(req.params.deck_Id)
        console.log(req.query)
        const deck= await Deck.findByPk(deckId)
        res.send(deck)
    } catch (error){
        console.log(error)
    }   
}

const getAllDecks = async (req, res) =>{
    try{
        const deckId= parseInt(req.params.deck_Id)
        const deck = await Deck.findAll(deckId)
        res.send(deck)
    } catch (error){
        throw error
    }
}

const createDecks = async (req, res) =>{
    try{
        let user_Id= parseInt(req.params.user_Id)
        const decks = await Deck.create({ userId: user_Id , ...req.body})
        res.send(decks)
    } catch (error){
        throw error
    }
}

const deleteDecks = async (req, res) =>{
    try{
        let deckId = parseInt(req.params.deck_Id)
        const del = await Deck.destroy({where: {id: deckId}})
        res.send({message: `Deleted deck with an id of ${deckId}`})
    }catch (error){
        throw error
    }
}

const updateDecks = async (req, res) => {
    try{
        let deckId = parseInt(req.params.deck_Id)
        const decks = await Deck.update(req.body, {
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
    updateDecks,
    getAllDecks
}