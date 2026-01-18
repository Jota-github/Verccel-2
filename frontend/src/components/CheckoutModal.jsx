import React from 'react';

// Adicionado "default" para resolver o erro de exportação
export default function CheckoutModal({ isOpen, onClose, cartItems, onConfirm }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-black text-[#000040] mb-6 uppercase tracking-tighter text-center">
          Confirmar Pedido
        </h2>
        
        <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between text-sm border-b pb-2">
              <span className="font-bold text-gray-600">{item.quantity}x {item.name}</span>
              <span className="font-black text-[#000040]">R$ {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-8 p-4 bg-gray-50 rounded-xl">
          <span className="font-black text-gray-400">TOTAL:</span>
          <span className="text-2xl font-black text-[#000040]">R$ {total.toFixed(2)}</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600 transition uppercase text-xs tracking-widest"
          >
            Voltar
          </button>
          <button
            onClick={onConfirm}
            className="flex-[2] bg-green-600 text-white py-4 rounded-xl font-black hover:bg-green-700 transition shadow-lg uppercase text-xs tracking-widest"
          >
            Confirmar Compra
          </button>
        </div>
      </div>
    </div>
  );
}