import React from 'react';

export default function ProductCard({ product, isAdmin, onEdit }) {
  return (
    /* Alterado de bg-white para bg-[#f0ad00] (Amarelo Moura) */
    <div className="bg-[#f0ad00] p-6 rounded-3xl border border-[#d99d00] shadow-md flex flex-col items-center text-center transition-transform hover:scale-[1.02]">
      <div className="w-full flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-[#000040] text-left leading-tight">{product.name}</h3>
        {/* Badge de unidades com fundo branco para contraste */}
        <span className="bg-white/40 text-[#000040] px-3 py-1 rounded-full text-xs font-black whitespace-nowrap">
          {String(product.stock || 0).padStart(2, '0')} un.
        </span>
      </div>
      
      {/* Preço formatado em azul escuro para destaque no fundo amarelo */}
      <p className="text-4xl font-black text-[#000040] mb-8">
        R$ {product.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </p>
      
      {isAdmin && (
        <button 
          onClick={() => onEdit(product)}
          /* Botão transparente com borda azul para manter a identidade visual */
          className="bg-transparent border-2 border-[#000040] text-[#000040] w-full py-3 rounded-full font-black hover:bg-[#000040] hover:text-white transition-all shadow-sm uppercase text-xs tracking-widest"
        >
          Alterar produto
        </button>
      )}
    </div>
  );
}