const API_BASE_URL = 'http://localhost:5000/api';

const handleResponse = async(response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}`);
    }
    return response.json();
};

export const cardService = {
    getCards: async() => {
        const response = await fetch(`${API_BASE_URL}/cards`);
        return handleResponse(response);
    },

    getCard: async(id) => {
        const response = await fetch(`${API_BASE_URL}/cards/${id}`);
        return handleResponse(response);
    },

    createCard: async(cardData) => {
        const response = await fetch(`${API_BASE_URL}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardData),
        });
        return handleResponse(response);
    },

    updateCard: async(id, cardData) => {
        const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardData),
        });
        return handleResponse(response);
    },

    deleteCard: async(id) => {
        const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    },

};