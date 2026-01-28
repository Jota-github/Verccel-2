import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import ProductModal from '../components/ProductModal';
import CheckoutModal from '../components/CheckoutModal';

const INITIAL_PRODUCTS = [
  { id: 1, name: "Bateria Moura 60Ah (M60AD)", price: 450.00, stock: 15 },
  { id: 2, name: "Painel Solar 330W", price: 890.00, stock: 8 },
  { id: 3, name: "Controlador de Carga MPPT", price: 320.00, stock: 12 },
  { id: 4, name: "Inversor de Tensão", price: 1500.00, stock: 5 },
  { id: 5, name: "Bateria Estacionária 105Ah", price: 980.00, stock: 20 }
];

export default function Home({ profile, onLogout }) {
  const isAdmin = profile === 'admin';
  
  // Estado local de produtos (Simulação)
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- LÓGICA DE ADMIN (PRODUTOS) ---
  const handleSaveProduct = (productData) => {
    if (productData.id) {
      // Editar
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    } else {
      // Adicionar novo
      const newProduct = { ...productData, id: Date.now() };
      setProducts(prev => [...prev, newProduct]);
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Deseja excluir este produto?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // --- LÓGICA DE USUÁRIO (CARRINHO) ---
  const handleAddToCart = (product) => {
    if (product.stock <= 0) return alert("Produto sem estoque!");
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity < product.stock) {
          return prev.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        alert("Limite de estoque atingido!");
        return prev;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const product = products.find(p => p.id === id);
        const newQty = item.quantity + amount;
        if (newQty >= 1 && newQty <= (product?.stock || 99)) {
          return { ...item, quantity: newQty };
        }
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#dce1e5]">
      <Navbar 
        isAdmin={isAdmin} 
        onLogout={onLogout} 
        onAddProduct={() => { setSelectedProduct(null); setIsModalOpen(true); }} 
      />
      
      <main className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-black text-[#000040] mb-8 uppercase tracking-tighter">
            {isAdmin ? "Gerenciar Inventário" : "Catálogo de Produtos"}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                isAdmin={isAdmin} 
                onAddToCart={handleAddToCart} 
                onEdit={(prod) => { setSelectedProduct(prod); setIsModalOpen(true); }}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        </div>

        {!isAdmin && (
          <aside className="w-full lg:w-96 flex-shrink-0">
            <Cart 
              items={cartItems} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart} 
              onFinish={() => setIsCheckoutOpen(true)} 
            />
          </aside>
        )}
      </main>
      
      {isModalOpen && (
        <ProductModal 
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setSelectedProduct(null); }} 
          product={selectedProduct} 
          onSave={handleSaveProduct} 
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
          cartItems={cartItems} 
          onConfirm={() => {
              alert("Compra finalizada com sucesso!");
              setCartItems([]);
              setIsCheckoutOpen(false);
          }} 
        />
      )}
    </div>
  );
}