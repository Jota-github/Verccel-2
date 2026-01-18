import React from 'react';

// Adicionado "default" para corrigir o erro de importação no Home.jsx
export default function Navbar({ isAdmin, onAddProduct, onLogout }) {
  return (
    <nav className="bg-[#000040] text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-4">
        {/* Imagem configurada para a versão apenas com o M colorido */}
        <img 
          src="/logo-moura.png" 
          alt="Moura" 
          className="h-9" 
        />
        <div className="border-l border-white/40 h-8"></div>
        <h1 className="text-2xl font-black tracking-wide uppercase">
          Sistema de Produtos
        </h1>
      </div>

      <div className="flex gap-4 items-center">
        {isAdmin && (
          <button 
            onClick={onAddProduct}
            className="bg-[#f0ad00] text-[#000040] px-6 py-3 rounded-xl font-black hover:bg-[#d99d00] transition shadow-md"
          >
            + Novo Produto
          </button>
        )}
        
        <button 
          onClick={onLogout}
          className="font-bold hover:text-gray-300 transition uppercase text-sm tracking-widest"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}