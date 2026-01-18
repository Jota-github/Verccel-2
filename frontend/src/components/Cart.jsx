import React from 'react';

export function Cart({ items, updateQuantity, removeFromCart, onFinish }) {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className="bg-[#000040] text-white p-4 text-center font-black uppercase">Meu Carrinho</div>
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {items.length === 0 && <p className="text-center text-gray-400 py-4">Carrinho vazio</p>}
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b pb-4">
            <div className="flex-1">
              <p className="font-bold text-sm text-gray-800">{item.name}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline">Remover</button>
            </div>
            <div className="flex items-center gap-2 px-3">
              <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-200 w-7 h-7 rounded-lg font-bold hover:bg-gray-300">-</button>
              <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)} className="bg-gray-200 w-7 h-7 rounded-lg font-bold hover:bg-gray-300">+</button>
            </div>
            <p className="font-bold text-sm text-moura-blue">R$ {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex justify-between font-black text-xl mb-4 text-[#000040]">
          <span>TOTAL:</span>
          <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        <button 
          disabled={items.length === 0}
          onClick={onFinish} 
          className="w-full bg-[#f0ad00] py-4 rounded-xl font-black text-[#000040] uppercase shadow-md hover:bg-[#d99d00] transition disabled:opacity-50"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}