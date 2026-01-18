import React, { useState } from 'react';
import api from '../api/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mantido: Valida no Banco/Java conforme sua configuração
  const USE_BACKEND = true;

  const handleManualLogin = async (role) => {
    if (USE_BACKEND) {
      try {
        const response = await api.post('/auth/login', { email, password });
        onLogin(response.data.role); 
      } catch (err) {
        // Usando 'err' aqui para o erro vermelho do VS Code sumir
        console.error("Falha na autenticação Moura:", err);
        alert('Falha na autenticação: Verifique suas credenciais no banco de dados.');
      }
    } else {
      if (email && password) {
        onLogin(role);
      } else {
        alert('Por favor, preencha o email e a senha.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000040] to-blue-900 px-6">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-10">
        <div className="flex justify-center mb-8">
          <img src="/logo-moura.png" alt="Moura" className="h-16" />
        </div>
        <h1 className="text-4xl font-black text-gray-800 text-center mb-10 tracking-tighter">
          Sistema de Produtos
        </h1>
        
        <div className="space-y-6">
          <div className="text-left">
            <label className="block text-gray-700 font-bold mb-2 ml-1">Email</label>
            <input
              type="email"
              placeholder="exemplo@moura.com.br"
              className="w-full h-14 px-4 rounded-xl border-2 border-gray-300 outline-none focus:border-[#000040] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-left">
            <label className="block text-gray-700 font-bold mb-2 ml-1">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-14 px-4 rounded-xl border-2 border-gray-300 outline-none focus:border-[#000040] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => handleManualLogin('admin')}
              className="h-14 bg-[#f0ad00] text-[#000040] font-black rounded-xl shadow-lg hover:bg-[#d99d00] transition-all uppercase text-xs tracking-widest"
            >
              Entrar como Admin
            </button>
            <button
              onClick={() => handleManualLogin('user')}
              className="h-14 bg-gray-200 text-[#000040] font-black rounded-xl shadow-lg hover:bg-gray-300 transition-all uppercase text-xs tracking-widest border border-gray-300"
            >
              Entrar como Usuário
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
          Modo atual: {USE_BACKEND ? 'Conectado ao Banco' : 'Simulação Offline'}
        </p>
      </div>
    </div>
  );
}