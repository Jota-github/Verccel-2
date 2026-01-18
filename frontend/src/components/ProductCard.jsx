import React from 'react';

// Use "export function" para que o nome ProductCard fique disponível para o Home.jsx
export function ProductCard({ product, isAdmin, onAddToCart, onEdit }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm flex flex-col items-center text-center">
      <div className="w-full flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
        {/* Formatação de unidades conforme seu protótipo */}
        <span className="bg-[#f0ad00]/20 text-[#8a6d00] px-3 py-1 rounded-full text-xs font-black">
          {String(product.stock || 0).padStart(2, '0')} un.
        </span>
      </div>
      
      {/* Exibição de preço formatado para R$ */}
      <p className="text-3xl font-black text-gray-900 mb-6">
        R$ {product.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </p>
      
      <button 
        onClick={() => onAddToCart(product)}
        className="bg-[#f0ad00] w-full py-3 rounded-full font-bold text-[#000040] mb-3 hover:bg-[#d99d00] transition-colors shadow-md"
      >
        Adicionar ao carrinho
      </button>
      
      {/* Botão de edição visível apenas para Admin */}
      {isAdmin && (
        <button 
          onClick={() => onEdit(product)}
          className="text-black underline font-bold text-sm hover:text-gray-600"
        >
          Alterar produto
        </button>
      )}
    </div>
  );
}