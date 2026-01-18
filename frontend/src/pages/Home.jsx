import React, { useState, useEffect } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Navbar from "../components/Navbar";

export default function Home() {
  // 🔹 LISTA DE DADOS EXPANDIDA PARA SIMULAR UM BACK-END REPLETO DE INFORMAÇÕES
  const initialMockProducts = [
    { id: 1, name: "Bateria Moura 60Ah (M60AD)", price: 450.00, stock: 15, category: "Automotiva" },
    { id: 2, name: "Painel Solar Monocristalino 330W", price: 890.00, stock: 8, category: "Energia Solar" },
    { id: 3, name: "Controlador de Carga MPPT 40A", price: 320.00, stock: 12, category: "Energia Solar" },
    { id: 4, name: "Inversor de Tensão Senoidal 2000W", price: 1500.00, stock: 5, category: "Energia Solar" },
    { id: 5, name: "Bateria Moura Estacionária 105Ah", price: 980.00, stock: 20, category: "Estacionária" },
    { id: 6, name: "Cabo Flexível Solar 6mm (Rolo 50m)", price: 250.00, stock: 10, category: "Acessórios" },
    { id: 7, name: "Conector MC4 (Par)", price: 15.90, stock: 50, category: "Acessórios" },
    { id: 8, name: "Suporte para Telhado Cerâmico (Kit)", price: 180.00, stock: 14, category: "Estrutura" },
    { id: 9, name: "Monitor de Baterias Digital", price: 85.00, stock: 30, category: "Monitoramento" }
  ];

  const [products, setProducts] = useState(initialMockProducts);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      if (response.data && response.data.length > 0) {
        setProducts(response.data);
      }
    } catch (error) {
      console.warn("⚠️ Backend offline - Modo Demonstração com 9 produtos carregados.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...productData, id: p.id } : p));
    } else {
      setProducts([...products, { ...productData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addToCart = (product) => {
    // Regra de Negócio: Não permite adicionar se não houver estoque disponível
    const cartItem = cart.find(item => item.id === product.id);
    const currentQtyInCart = cartItem ? cartItem.quantity : 0;

    if (currentQtyInCart < product.stock) {
      if (cartItem) {
        setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    } else {
      alert("Estoque insuficiente para este produto!");
    }
  };

  const handleCheckout = () => {
    // Regra de Negócio do Case: Ao fazer checkout, diminuir estoque [cite: 376]
    // Se o estoque for insuficiente, bloquear a venda 
    const newProducts = products.map(p => {
      const cartItem = cart.find(item => item.id === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.quantity } : p;
    });
    
    setProducts(newProducts);
    setCart([]);
    alert("Checkout realizado com sucesso! O estoque foi atualizado conforme as regras de negócio.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        cartTotal={cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
        onCheckout={handleCheckout}
      />
      
      <main className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-moura-blue">Catálogo Técnico</h1>
            <p className="text-sm text-gray-500 italic">Simulação de estoque em tempo real</p>
          </div>
          <button 
            onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
            className="bg-moura-blue hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-bold transition-colors w-full md:w-auto"
          >
            + Adicionar Produto
          </button>
        </div>

        {/* Grid Responsivo para QR Code/Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onEdit={() => { setEditingProduct(product); setIsModalOpen(true); }}
              onDelete={() => handleDeleteProduct(product.id)}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <ProductModal 
          product={editingProduct} 
          onSave={handleSaveProduct} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}