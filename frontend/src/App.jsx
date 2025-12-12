/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import chipImage from './assets/chip.png';
import masterCard from './assets/mastercard.png';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import CreditCardTable from './components/CreditCardTable';
import { cardService } from './services/cardService';
import FullScreenLoader from './components/FullScreenLoader';
import CreditCardDisplay from './components/CreditCardDisplay';
import CreditCardForm from './components/CreditCardForm';

function App() {

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    1: ''
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    fetchCards();
  }, [])

  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cardService.getCards();
      setCards(data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar tarjetas:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const addCreditCard = async (cardData) => {
    try {
      const newCard = await cardService.createCard(cardData);
      setCards([newCard, ...cards]);
      return { success: true, data: newCard };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteCreditCard = async (cardId) => {
    try {
      await cardService.deleteCard(cardId);
      setCards(cards.filter(card => card.id !== cardId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const cardGroups = useMemo(() => {
    const formatCardNumber = (number) => {
      const cleanNumber = number.replace(/\s/g, '');
      if (cleanNumber.length !== 16) {
        const filledNumber = cleanNumber.padEnd(16, '•');
        return [
          filledNumber.substring(0, 4),
          filledNumber.substring(4, 8),
          filledNumber.substring(8, 12),
          filledNumber.substring(12, 16)
        ];
      }
      
      return [
        cleanNumber.substring(0, 4),
        cleanNumber.substring(4, 8),
        cleanNumber.substring(8, 12),
        cleanNumber.substring(12, 16)
      ];
    };
    
    return formatCardNumber(formData.cardNumber);
  }, [formData.cardNumber]);

  const validateExpiryDate = (input) => {
    let formattedValue = input.replace(/\D/g, '');
    
    if (formattedValue.length > 4) formattedValue = formattedValue.substring(0, 4);

    if (formattedValue.length > 2) {
      formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
    }
    
    return formattedValue;
  };

  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'cardNumber') {
      const cleanNumber = value.replace(/\s/g, '');
      if (cleanNumber.length !== 16) {
        error = 'El número de tarjeta debe tener exactamente 16 dígitos';
      } else if (!/^\d+$/.test(cleanNumber)) {
        error = 'El número de tarjeta solo puede contener dígitos';
      }
    }
    
    if (name === 'cardHolder') {
      if (!value.trim()) {
        error = 'El nombre del titular es requerido';
      } else if (value.length < 3) {
        error = 'El nombre debe tener al menos 3 caracteres';
      } else if (!/^[A-ZÁÉÍÓÚÑ\s]+$/i.test(value)) {
        error = 'El nombre solo puede contener letras y espacios';
      }
    }
    
    if (name === 'expiryDate') {
      if (!value.trim()) {
        error = 'La fecha de vencimiento es requerida';
      } else if (value.length !== 5) {
        error = 'Formato inválido. Use MM/AA';
      } else {
        const [month, year] = value.split('/');
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (monthNum < 1 || monthNum > 12) {
          error = 'Mes inválido. Debe ser entre 01 y 12';
        } else if (yearNum < currentYear || yearNum > currentYear + 5) {
          error = `Año inválido. Debe ser entre ${currentYear} y ${currentYear + 5}`;
        } else if (yearNum === currentYear && monthNum < currentMonth) {
          error = 'Esta fecha ya ha expirado';
        }
      }
    }
    
    if (name === 'cvv') {
      if (!value.trim()) {
        error = 'El CVV es requerido';
      } else if (value.length < 3) {
        error = 'El CVV debe tener al menos 3 dígitos';
      } else if (!/^\d+$/.test(value)) {
        error = 'El CVV solo puede contener dígitos';
      } else if (value.length > 4) {
        error = 'El CVV no puede tener más de 4 dígitos';
      }
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 16) formattedValue = formattedValue.substring(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    
    if (name === 'expiryDate') {
      formattedValue = validateExpiryDate(value);
    }
    
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) formattedValue = formattedValue.substring(0, 4);
    }
    
    if (name === 'cardHolder') {
      formattedValue = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]/g, '');
      
      formattedValue = formattedValue.replace(/\s+/g, ' ');
      
      formattedValue = formattedValue
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    const error = validateField(name, formattedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    let hasErrors = false;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) hasErrors = true;
    });
    
    setErrors(newErrors);
    
    if (hasErrors) {
      toast.error('Corrige los errores antes de continuar');
      return;
    }
    
    try {
      setLoading(true);
      
      const newCard = await addCreditCard(formData);
      
      setFormData({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' });
      
      toast.success('Tarjeta agregada exitosamente');
      
    } catch (error) {
      console.error('Error guardando:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    try {
      setLoading(true);
      await deleteCreditCard(id);
      
      setCards(prev => prev.filter(card => card.id !== id));
      
      toast.success('Tarjeta eliminada');
    } catch (error) {
      console.error('Error eliminando:', error);
      toast.error('Error al eliminar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        {loading && <FullScreenLoader />}
      <div className="w-screen h-screen flex justify-center items-center transform scale-75">
        <article className="credit-card" aria-label="Tarjeta de crédito monobank Universal Bank">
          <div className="flex justify-center ">

            <CreditCardDisplay
              cardGroups={cardGroups}
              cardHolder={formData.cardHolder}
              expiryDate={formData.expiryDate}
            />
            
            
          </div>
            <CreditCardForm
        formData={formData}
        errors={errors}
        isLoading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={() => setFormData({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' })}
      />

            <div className="mt-5">
          <CreditCardTable 
              cards={cards}
              onDelete={handleDelete}
              loading={loading}
              onRefresh={fetchCards}
            />
        </div>
        </article>
      </div>
        <ToastContainer
          />
    </>
  )
}

export default App
