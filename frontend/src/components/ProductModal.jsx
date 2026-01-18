import React, { useState, useEffect } from 'react';

export function ProductModal({ isOpen, onClose, product, onSave }) {
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isOpen) {
      const initialData = product || { name: '', price: '', stock: '' };
      setFormData(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(initialData)) return initialData;
        return prev;
      });
    }
  }, [isOpen, product]);

  // Função de salvar com trava contra números negativos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.stock < 0) {
      return alert("A quantidade não pode ser negativa!");
    }
    if (formData.price <= 0) {
      return alert("O preço deve ser maior que zero!");
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-200">
        
        <div className="bg-[#000040] text-white p-5 text-center font-bold text-xl relative">
          {product ? 'Alterando produto' : 'Novo produto'}
          <button onClick={onClose} className="absolute right-6 top-5 hover:text-gray-300 transition-colors">✕</button>
        </div>
        
        <form className="p-10 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-bold text-gray-700 mb-2 ml-1 text-left">Nome do produto:</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#dce1e5] border-2 border-gray-300 rounded-xl p-3 outline-none focus:border-[#000040] transition-all" 
            />
          </div>
          
          <div>
            <label className="block font-bold text-gray-700 mb-2 ml-1 text-left">Preço do produto:</label>
            <input 
              type="number" 
              step="0.01"
              min="0.01" // Trava nativa do navegador para preço
              required
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
              className="w-full bg-[#dce1e5] border-2 border-gray-300 rounded-xl p-3 outline-none focus:border-[#000040] transition-all" 
            />
          </div>
          
          <div>
            <label className="block font-bold text-gray-700 mb-2 ml-1 text-left">Quantidade do produto:</label>
            <input 
              type="number" 
              min="0" // Trava nativa que impede selecionar negativos no campo
              required
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
              className="w-full bg-[#dce1e5] border-2 border-gray-300 rounded-xl p-3 outline-none focus:border-[#000040] transition-all" 
            />
          </div>
          
          <div className="flex justify-center pt-4">
            <button 
              type="submit"
              className="bg-[#f0ad00] text-[#000040] font-black px-16 py-4 rounded-xl hover:bg-[#d99d00] transition-all uppercase tracking-widest shadow-lg"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}