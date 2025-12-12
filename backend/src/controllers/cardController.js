const cardService = require('../services/cardService');

const validateCardData = (data) => {
    const errors = [];

    if (!data.cardHolder) errors.push('cardHolder es requerido');
    if (!data.cardNumber) errors.push('cardNumber es requerido');
    if (!data.expiryDate) errors.push('expiryDate es requerido');

    return errors;
};

const getCards = async(req, res) => {
    try {
        const cards = await cardService.getAllCards();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tarjetas' });
    }
};

const getCard = async(req, res) => {
    try {
        const card = await cardService.getCardById(req.params.id);

        if (!card) {
            return res.status(404).json({ error: 'Tarjeta no encontrada' });
        }

        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tarjeta' });
    }
};

const createCard = async(req, res) => {
    try {
        console.log('📨 Datos recibidos en createCard:', JSON.stringify(req.body, null, 2));

        const validationErrors = validateCardData(req.body);

        if (validationErrors.length > 0) {
            console.log('❌ Validación fallida:', validationErrors);
            return res.status(400).json({
                error: 'Validación fallida',
                details: validationErrors
            });
        }

        console.log('📤 Llamando a cardService.createCard...');
        const newCard = await cardService.createCard(req.body);
        console.log('✅ Tarjeta creada exitosamente:', newCard);

        res.status(201).json(newCard);
    } catch (error) {
        console.error('💥 ERROR COMPLETO en createCard:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            details: error.details
        });

        res.status(500).json({
            error: 'Error al crear tarjeta',
            details: error.message,
            code: error.code
        });
    }
};

const updateCard = async(req, res) => {
    try {
        const validationErrors = validateCardData(req.body);

        if (validationErrors.length > 0) {
            return res.status(400).json({
                error: 'Validación fallida',
                details: validationErrors
            });
        }

        const updatedCard = await cardService.updateCard(req.params.id, req.body);

        if (!updatedCard) {
            return res.status(404).json({ error: 'Tarjeta no encontrada' });
        }

        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar tarjeta' });
    }
};

const deleteCard = async(req, res) => {
    try {
        const cardExists = await cardService.getCardById(req.params.id);

        if (!cardExists) {
            return res.status(404).json({ error: 'Tarjeta no encontrada' });
        }

        await cardService.deleteCard(req.params.id);
        res.status(200).json({ message: 'Tarjeta eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar tarjeta' });
    }
};



module.exports = {
    getCards,
    getCard,
    createCard,
    updateCard,
    deleteCard
};