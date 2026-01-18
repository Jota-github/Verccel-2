import React from 'react';

// Adicionada a prop onConfirm para a amarração com o backend
export function CheckoutModal({ isOpen, onClose, cartItems, onConfirm }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-[#000040] text-white p-5 text-center font-bold text-xl relative">
          Finalizando sua compra
          <button onClick={onClose} className="absolute right-6 top-5 hover:text-gray-300">✕</button>
        </div>
        
        <div className="p-8">
          <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2">
            {cartItems.map((item, index) => (
              <div key={index} className="border-b border-gray-300 pb-2">
                <p className="font-bold text-lg">{item.name}</p>
                <div className="flex justify-between text-gray-600">
                  <span>{String(item.quantity).padStart(2, '0')} un.</span>
                  <span className="font-bold text-black">
                    R$ {item.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#dce1e5] p-6 rounded-2xl mb-6 flex justify-between items-center">
            <span className="font-bold text-xl uppercase">Total:</span>
            <span className="font-black text-2xl">
              R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button 
            className="w-full bg-[#f0ad00] hover:bg-[#d99d00] text-[#000040] font-black py-4 rounded-xl transition-all uppercase tracking-widest shadow-lg"
            onClick={onConfirm} // Agora chama a função que integra com o banco de dados
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}