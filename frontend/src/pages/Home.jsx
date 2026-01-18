import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';
import { ProductModal } from '../components/ProductModal';
import { CheckoutModal } from '../components/CheckoutModal';
import api from '../api/api';

export default function Home({ profile, onLogout }) {
  const isAdmin = profile === 'ADMIN';
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      console.error("Erro ao carregar produtos do banco Moura:", err);
      setProducts([]);
    }
  }, []); 

  // O comentário abaixo silencia o aviso do VS Code e resolve o erro da linha 32
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadProducts();
  }, []); // Mantemos o array vazio para carregar apenas uma vez ao abrir a página

  const handleSaveProduct = async (formData) => {
    try {
      if (formData.id) {
        await api.put(`/products/${formData.id}`, formData);
      } else {
        await api.post('/products', formData);
      }
      loadProducts(); 
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Falha na operação de salvamento:", err);
      alert("Erro ao salvar no banco de dados.");
    }
  };

  const handleAddToCart = (product) => {
    if (product.stock <= 0) return alert("Bateria sem estoque no momento!");
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleConfirmCheckout = async () => {
    try {
      for (const item of cartItems) {
        await api.post(`/products/${item.id}/checkout?quantity=${item.quantity}`);
      }
      
      alert("Compra finalizada! O estoque Moura foi atualizado no banco.");
      setCartItems([]);
      setIsCheckoutOpen(false);
      loadProducts(); 
    } catch (err) {
      const msg = err.response?.data || "Erro ao processar venda.";
      console.error("Erro no checkout:", err);
      alert(msg);
      setIsCheckoutOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dce1e5]">
      <Navbar 
        isAdmin={isAdmin} 
        onLogout={onLogout} 
        onAddProduct={() => { setSelectedProduct(null); setIsModalOpen(true); }} 
      />
      
      <main className="p-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              isAdmin={isAdmin} 
              onAddToCart={handleAddToCart} 
              onEdit={(prod) => { setSelectedProduct(prod); setIsModalOpen(true); }} 
            />
          ))}
        </div>

        {!isAdmin && (
          <aside className="w-full lg:w-80">
            <Cart 
              items={cartItems} 
              updateQuantity={(id, amt) => 
                setCartItems(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + amt)} : i))
              } 
              removeFromCart={(id) => setCartItems(prev => prev.filter(i => i.id !== id))} 
              onFinish={() => setIsCheckoutOpen(true)} 
            />
          </aside>
        )}
      </main>
      
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedProduct(null); }} 
        product={selectedProduct} 
        onSave={handleSaveProduct} 
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cartItems={cartItems} 
        onConfirm={handleConfirmCheckout} 
      />
    </div>
  );
}