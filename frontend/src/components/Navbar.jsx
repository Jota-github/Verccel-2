import React from 'react';

export default function Navbar({ isAdmin, onAddProduct, onLogout }) {
  return (
    <nav className="bg-[#000040] text-white px-4 md:px-8 py-4 flex flex-wrap justify-between items-center shadow-lg gap-4">
      {/* Lado Esquerdo: Logo e Título */}
      <div className="flex items-center gap-2 md:gap-4">
        <img 
          src="/logo-moura.png" 
          alt="Moura" 
          className="h-7 md:h-9" 
        />
        <div className="border-l border-white/40 h-6 md:h-8"></div>
        <h1 className="text-lg md:text-2xl font-black tracking-wide uppercase truncate max-w-[150px] md:max-w-none">
          Produtos
        </h1>
      </div>

      {/* Lado Direito: Ações */}
      <div className="flex gap-3 md:gap-4 items-center">
        {isAdmin && (
          <button 
            onClick={onAddProduct}
            className="bg-[#f0ad00] text-[#000040] px-4 md:px-6 py-2 md:py-3 rounded-xl font-black hover:bg-[#d99d00] transition shadow-md text-xs md:text-base whitespace-nowrap"
          >
            + Novo Produto
          </button>
        )}
        
        <button 
          onClick={onLogout}
          className="font-bold hover:text-gray-300 transition uppercase text-[10px] md:text-sm tracking-widest"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}