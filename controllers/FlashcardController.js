const { Flashcard } = require('../models')
const { op } = require('sequelize')

const getFlashcard = async (req, res) => {
  try {
    let flashcardId = parseInt(req.params.flashcard_id)
    let flashcard = await Flashcard.findOne({ where: { id: flashcardId } })
    res.send(flashcard)
  } catch (error) {
    throw error
  }
}

const getFlashcardsByDeck = async (req, res) => {
  try {
    let deckId = parseInt(req.params.deck_id)
    let flashcards = await Flashcard.findAll({ where: { deckId: deckId } })
    res.send(flashcards)
  } catch (error) {}
}

const updateFlashcard = async (req, res) => {
  try {
    let flashcardId = parseInt(req.params.flashcard_id)
    let updated = await Flashcard.update(req.body, {
      where: { id: flashcardId },
      returning: true
    })
    res.send(updated)
  } catch (error) {
    throw error
  }
}

const deleteFlashcard = async (req, res) => {
  try {
    let flashcardId = parseInt(req.params.flashcard_id)
    await Flashcard.destroy({ where: { id: flashcardId } })
    res.send(`Flashcard with id ${flashcardId} has been destroyed`)
  } catch (error) {
    throw error
  }
}

const createFlashcard = async (req, res) => {
  try {
    let deckId = parseInt(req.params.deck_id)
    let flashcard = await Flashcard.create({
      deckId,
      ...req.body
    })
    res.send(flashcard)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getFlashcard,
  getFlashcardsByDeck,
  updateFlashcard,
  deleteFlashcard,
  createFlashcard
}
