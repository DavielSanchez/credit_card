export const formatCardNumber = (cardNumber) => {

    if (!cardNumber) return '•••• •••• •••• ••••';

    try {
        const cardNumberStr = String(cardNumber).trim();
        if (cardNumberStr === '') return '•••• •••• •••• ••••';

        const cleanNumber = cardNumberStr.replace(/\s/g, '');
        if (cleanNumber.length >= 6) {
            const firstTwo = cleanNumber.substring(0, 2);
            const lastFour = cleanNumber.slice(-4);
            return `${firstTwo}** **** **** ${lastFour}`;
        }
        return `•••• •••• •••• ${cleanNumber.slice(-4)}`;
    } catch (error) {
        console.error('Error formateando número:', error);
        return '•••• •••• •••• ••••';
    }
};


export const getCardProperty = (card, propertyNames) => {
    if (!card) return '--';

    for (const prop of propertyNames) {
        if (card[prop] !== undefined && card[prop] !== null && card[prop] !== '') {
            return card[prop];
        }
    }
    return '--';
};