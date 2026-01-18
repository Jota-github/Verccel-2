import React, { useState, useEffect } from 'react';

// Adicionado "default" para corrigir o erro de build no Vercel
export default function ProductModal({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-black text-[#000040] mb-6 uppercase tracking-tight">
          {product ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-1 ml-1">Nome do Produto</label>
            <input
              type="text"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-[#f0ad00] outline-none transition-colors font-bold"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-1 ml-1">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-[#f0ad00] outline-none transition-colors font-bold"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-1 ml-1">Estoque</label>
              <input
                type="number"
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-[#f0ad00] outline-none transition-colors font-bold"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 font-bold text-gray-400 hover:text-gray-600 transition"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="flex-[2] bg-[#000040] text-white py-4 rounded-xl font-black hover:bg-blue-900 transition shadow-lg"
            >
              SALVAR PRODUTO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}