import React from 'react';

export default function ProductCard({ product, isAdmin, onEdit }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm flex flex-col items-center text-center">
      <div className="w-full flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
        {/* Unidades com zeros à esquerda */}
        <span className="bg-[#f0ad00]/20 text-[#8a6d00] px-3 py-1 rounded-full text-xs font-black">
          {String(product.stock || 0).padStart(2, '0')} un.
        </span>
      </div>
      
      {/* Preço formatado */}
      <p className="text-3xl font-black text-gray-900 mb-6">
        R$ {product.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </p>
      
      {/* Botão de edição visível apenas para Admin */}
      {isAdmin && (
        <button 
          onClick={() => onEdit(product)}
          className="bg-white border-2 border-[#000040] text-[#000040] w-full py-3 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-sm"
        >
          Alterar produto
        </button>
      )}
    </div>
  );
}