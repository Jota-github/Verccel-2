import React, { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  // Inicializa o estado lendo o que está salvo no navegador
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [userProfile, setUserProfile] = useState(() => {
    return localStorage.getItem('userProfile') || null;
  });

  const handleLogin = (profile) => {
    setIsLoggedIn(true);
    setUserProfile(profile);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfile', profile);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.clear(); // Limpa os dados de acesso ao sair
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Home profile={userProfile} onLogout={handleLogout} />
      )}
    </div>
  );
}