const supabase = require('../config/supabase');

const cardService = {
    getAllCards: async() => {
        const { data, error } = await supabase
            .from('cards')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    getCardById: async(id) => {
        const { data, error } = await supabase
            .from('cards')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw error;
        }

        return data;
    },

    createCard: async(cardData) => {
        const preparedData = {
            cardHolder: cardData.cardHolder.toUpperCase(),
            cardNumber: cardData.cardNumber,
            expiryDate: cardData.expiryDate,
            cvv: cardData.cvv || null,
            created_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('cards')
            .insert([preparedData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    updateCard: async(id, cardData) => {
        const preparedData = {
            cardHolder: cardData.cardHolder.toUpperCase(),
            cardNumber: cardData.cardNumber,
            expiryDate: cardData.expiryDate,
            cvv: cardData.cvv || null,
        };

        const { data, error } = await supabase
            .from('cards')
            .update(preparedData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw error;
        }

        return data;
    },

    deleteCard: async(id) => {
        const { error } = await supabase
            .from('cards')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    checkConnection: async() => {
        const { error } = await supabase
            .from('cards')
            .select('count', { count: 'exact', head: true });

        return { connected: !error };
    }
};

module.exports = cardService;