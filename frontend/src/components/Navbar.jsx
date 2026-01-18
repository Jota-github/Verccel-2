import React from 'react';

export default function Navbar({ isAdmin, onAddProduct, onLogout }) {
  return (
    /* Adicionado flex-wrap e gap-4 para que os itens se ajustem em telas pequenas */
    <nav className="bg-[#000040] text-white px-4 md:px-8 py-4 flex flex-wrap justify-between items-center shadow-lg gap-y-4">
      <div className="flex items-center gap-3">
        <img 
          src="/logo-moura.png" 
          alt="Moura" 
          className="h-7 md:h-9" 
        />
        <div className="border-l border-white/40 h-6 md:h-8"></div>
        <h1 className="text-lg md:text-2xl font-black tracking-tight uppercase">
          Produtos
        </h1>
      </div>

      <div className="flex gap-3 md:gap-6 items-center">
        {isAdmin && (
          <button 
            onClick={onAddProduct}
            /* Reduzido o padding e a fonte em telas pequenas (text-xs) para não quebrar o layout */
            className="bg-[#f0ad00] text-[#000040] px-4 md:px-6 py-2 md:py-3 rounded-xl font-black hover:bg-[#d99d00] transition shadow-md text-xs md:text-sm whitespace-nowrap"
          >
            + Novo Produto
          </button>
        )}
        
        <button 
          onClick={onLogout}
          className="font-bold hover:text-gray-300 transition uppercase text-[10px] md:text-xs tracking-widest"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}