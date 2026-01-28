import React, { useState, useEffect } from 'react';

// Export default garantido para evitar erros de build
export default function ProductModal({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  });

  // Carrega os dados se for uma edição, ou limpa se for um novo produto
  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({ name: '', price: '', stock: '' });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Envia os dados formatados para a lógica de simulação no Home.jsx
    onSave({
      ...formData,
      id: product?.id, // Mantém o ID se for edição para a lógica de find/map
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all">
        <h2 className="text-2xl font-black text-[#000040] mb-6 uppercase tracking-tight">
          {product ? '📦 Alterar Produto' : '✨ Novo Produto'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-1 ml-1">
              Nome do Produto
            </label>
            <input
              type="text"
              placeholder="Ex: Bateria Moura 60Ah"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-[#f0ad00] outline-none transition-colors font-bold text-[#000040]"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-1 ml-1">
                Preço (R$)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-[#f0ad00] outline-none transition-colors font-bold text-[#000040]"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-1 ml-1">
                Estoque
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-[#f0ad00] outline-none transition-colors font-bold text-[#000040]"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              className="w-full bg-[#f0ad00] text-[#000040] py-4 rounded-xl font-black hover:bg-[#d99d00] transition shadow-lg uppercase tracking-widest text-sm"
            >
              {product ? 'Confirmar Alteração' : 'Cadastrar no Inventário'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 font-bold text-gray-400 hover:text-red-500 transition uppercase text-xs tracking-widest"
            >
              Cancelar e Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}