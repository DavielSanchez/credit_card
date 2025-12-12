import React from 'react';

const CreditCardForm = ({ 
  formData = {},
  errors = {},
  isLoading = false,
  onChange,
  onSubmit,
  onReset 
}) => {
  return (
    <div className='pt-29 pb-10 px-20 border w-full max-w-4xl mx-auto -mt-20'>
      <form onSubmit={onSubmit}>
        <div className='flex gap-4 md:gap-6'> 
          <div className="mb-6 flex-1">
            <label className="block text-sm sm:text-md font-bold text-gray-700 mb-2">
              Número de Tarjeta
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber || ''}
              onChange={onChange}
              placeholder=""
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              maxLength="19"
              required
              disabled={isLoading}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>
          
          <div className="mb-6 flex-1">
            <label className="block text-sm sm:text-md font-bold text-gray-700 mb-2">
              Nombre Titular
            </label>
            <input
              type="text"
              name="cardHolder"
              value={formData.cardHolder || ''}
              onChange={onChange}
              placeholder=""
              maxLength="20"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition uppercase"
              required
              disabled={isLoading}
            />
            {errors.cardHolder && (
              <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 md:mb-8">
          <div>
            <label className="block text-sm sm:text-md font-bold text-gray-700 mb-2">
              Fecha Vencimiento
            </label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate || ''}
              onChange={onChange}
              placeholder="MM/YY"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              maxLength="5"
              required
              disabled={isLoading}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-md font-bold text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv || ''}
              onChange={onChange}
              placeholder="123"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              maxLength="3"
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-[#4640de] hover:bg-blue-700 text-white px-4 py-1 rounded-4xl font-medium text-xs ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Procesando...' : 'Agregar Tarjeta'}
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className={`bg-[#efefef] text-[#b1b1b1] hover:bg-gray-300 hover:text-gray-700 px-4 py-1 rounded-4xl font-medium text-xs ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreditCardForm;