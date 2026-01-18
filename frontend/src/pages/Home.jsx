import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';
import { ProductModal } from '../components/ProductModal';
import { CheckoutModal } from '../components/CheckoutModal';
import api from '../api/api';

export default function Home({ profile, onLogout }) {
  // Define se é admin comparando com a string enviada pelo Login
  const isAdmin = profile === 'admin';
  
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
      console.warn("Utilizando modo de demonstração offline.");
      // Dados Mockados caso o backend esteja offline
      setProducts([
        { id: 1, name: "Bateria Moura 60Ah", price: 450.00, stock: 15 },
        { id: 2, name: "Painel Solar 330W", price: 890.00, stock: 8 },
        { id: 3, name: "Controlador de Carga", price: 320.00, stock: 12 }
      ]);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddToCart = (product) => {
    if (product.stock <= 0) return alert("Produto sem estoque!");
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Função central para os botões + e - do carrinho
  const updateQuantity = (id, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        // Validação: não permite menos que 1 e nem mais que o estoque disponível
        if (newQty >= 1 && newQty <= item.stock) {
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
      
      {/* Layout Flex para Barra Lateral */}
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

        {/* Carrinho Lateral Restaurado */}
        {!isAdmin && (
          <aside className="w-full lg:w-96">
            <Cart 
              items={cartItems} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart} 
              onFinish={() => setIsCheckoutOpen(true)} 
            />
          </aside>
        )}
      </main>
      
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedProduct(null); }} 
        product={selectedProduct} 
        onSave={loadProducts} 
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cartItems={cartItems} 
        onConfirm={() => {
            alert("Compra finalizada!");
            setCartItems([]);
            setIsCheckoutOpen(false);
        }} 
      />
    </div>
  );
}