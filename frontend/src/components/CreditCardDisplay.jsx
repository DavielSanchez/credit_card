import React from 'react';
import chipImage from '../assets/chip.png';
import masterCard from '../assets/mastercard.png';

const CreditCardDisplay = ({ 
  cardGroups = [], 
  cardHolder = '', 
  expiryDate = '' 
}) => {
  return (
    <div className='relative w-[440px] h-[278px] rounded-2xl bg-[#0f1521] text-white shadow-2xl overflow-hidden'>
      <header className="p-6">
        <div className="flex justify-between items-center">
          <div className="bank-info flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">monobank</h1>
            <span className="text-[#475569]">|</span>
            <p className="text-lg text-[#475569] tracking-wide">Universal Bank</p>
          </div>
          <div className="w-15 h-10 flex items-center justify-center">
            <div className="contactless-icon">
              <svg 
                className="w-20 h-20 text-[#475569]"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
              >
                <path 
                  d="M22,18 Q24.5,20 22,22" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                />
                <path 
                  d="M25,16 Q28.5,20 25,24" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                />
                <path 
                  d="M28,14 Q32.5,20 28,26" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                />
                <path 
                  d="M31,12 Q36.5,20 31,28" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>
      
      <main className="px-6 pb-2">
        <div className="flex justify-between">
          <div className="w-16 h-10 mb-4">
            <img 
              src={chipImage}
              alt="Chip de tarjeta" 
              className="h-full object-contain"
            />
          </div>
          <div className="self-end me-6">
            <p className='text-md text-[#475569] font-semibold'>world</p>
          </div>
        </div>
        <div className="mb-2 mx-5">
          <div className="flex justify-between space-x-4">
            {cardGroups.map((group, index) => (
              <span 
                key={index}
                className="text-2xl tracking-[0.2em] font-bold
                          text-transparent bg-clip-text
                          bg-gradient-to-b from-[#c0cad8] via-[#8695a9] to-[#5a6777]
                          [text-shadow:_0_1px_1px_#3E4857]"
              >
                {group}
              </span>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="flex justify-end">
        <div>
          <div className='flex items-center justify-end'>
            <div>
              <p className='text-[8px] leading-[8px] text-[#475569] tracking-tighter font-medium'>
                VALID<br />THRU
              </p>
            </div>
            <div className='ms-1.5'>
              <span 
                className="text-md tracking-[0.1em] font-bold
                          text-transparent bg-clip-text
                          bg-gradient-to-b from-[#c0cad8] via-[#8695a9] to-[#5a6777]
                          [text-shadow:_0_1px_1px_#3E4857]"
              >
                {expiryDate}
              </span>
            </div>
          </div>
          <div className='flex justify-start'>
            <span 
              className="text-2xl font-mono font-bold
                        text-transparent bg-clip-text
                        bg-gradient-to-b from-[#c0cad8] via-[#8695a9] to-[#5a6777]
                        [text-shadow:_0_1px_1px_#3E4857]"
            >
              {cardHolder.toUpperCase()}
            </span>
          </div>
        </div>
        <div>
          <div className="w-20 h-15 mb-2 ms-12 me-6">
            <img 
              src={masterCard}
              alt="Logo Mastercard" 
              className="h-full object-contain"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreditCardDisplay;