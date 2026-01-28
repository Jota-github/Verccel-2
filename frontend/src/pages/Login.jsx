import React from 'react';

export default function Login({ onLogin }) {
  // Função para acesso direto ao perfil selecionado
  const handleProfileAccess = (role) => {
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000040] to-blue-900 px-6">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-10">
        <div className="flex justify-center mb-8">
          <img src="/logo-moura.png" alt="Moura" className="h-16" />
        </div>
        
        <h1 className="text-4xl font-black text-gray-800 text-center mb-4 tracking-tighter">
          Sistema de Produtos
        </h1>
        
        <p className="text-gray-500 text-center mb-10 font-medium">
          Selecione o tipo de acesso desejado para entrar no sistema.
        </p>
        
        <div className="grid grid-cols-1 gap-4 pt-4">
          <button
            onClick={() => handleProfileAccess('admin')}
            className="h-16 bg-[#f0ad00] text-[#000040] font-black rounded-xl shadow-lg hover:bg-[#d99d00] transition-all uppercase text-sm tracking-widest flex items-center justify-center"
          >
            Acessar como Administrador
          </button>
          
          <button
            onClick={() => handleProfileAccess('user')}
            className="h-16 bg-gray-200 text-[#000040] font-black rounded-xl shadow-lg hover:bg-gray-300 transition-all uppercase text-sm tracking-widest border border-gray-300 flex items-center justify-center"
          >
            Acessar como Usuário
          </button>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Acesso Rápido Habilitado
          </p>
        </div>
      </div>
    </div>
  );
}