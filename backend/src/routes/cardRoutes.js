const express = require('express');
const router = express.Router();
const {
    getCards,
    getCard,
    createCard,
    updateCard,
    deleteCard,
} = require('../controllers/cardController');


router.get('/', getCards);
router.get('/:id', getCard);
router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

module.exports = router;