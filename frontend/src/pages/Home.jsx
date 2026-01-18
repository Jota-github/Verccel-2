import React, { useState, useEffect } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart"; // Certifique-se de que este arquivo existe

export default function Home({ profile, onLogout }) {
  // Define se é admin comparando com a string enviada pelo Login
  const isAdmin = profile === 'admin';

  const initialMockProducts = [
    { id: 1, name: "Bateria Moura 60Ah (M60AD)", price: 450.00, stock: 15 },
    { id: 2, name: "Painel Solar Monocristalino 330W", price: 890.00, stock: 8 },
    { id: 3, name: "Controlador de Carga MPPT 40A", price: 320.00, stock: 12 },
    { id: 4, name: "Inversor de Tensão Senoidal 2000W", price: 1500.00, stock: 5 },
    { id: 5, name: "Bateria Moura Estacionária 105Ah", price: 980.00, stock: 20 },
    { id: 6, name: "Cabo Flexível Solar 6mm (Rolo 50m)", price: 250.00, stock: 10 },
    { id: 7, name: "Conector MC4 (Par)", price: 15.90, stock: 50 },
    { id: 8, name: "Suporte para Telhado Cerâmico (Kit)", price: 180.00, stock: 14 },
    { id: 9, name: "Monitor de Baterias Digital", price: 85.00, stock: 30 }
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
      console.warn("⚠️ Utilizando modo de demonstração offline.");
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

  const addToCart = (product) => {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
      if (cartItem.quantity < product.stock) {
        setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        alert("Limite de estoque atingido!");
      }
    } else if (product.stock > 0) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    const newProducts = products.map(p => {
      const cartItem = cart.find(item => item.id === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.quantity } : p;
    });
    setProducts(newProducts);
    setCart([]);
    alert("Venda finalizada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        isAdmin={isAdmin} 
        onAddProduct={() => { setEditingProduct(null); setIsModalOpen(true); }}
        onLogout={onLogout} 
      />
      
      {/* Layout Flex para permitir o carrinho lateral */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <main className={`flex-1 p-4 md:p-8 overflow-y-auto transition-all ${!isAdmin && cart.length > 0 ? 'md:mr-80' : ''}`}>
          <h1 className="text-2xl font-bold text-[#000040] mb-8 uppercase tracking-tighter">
            Catálogo de Produtos
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isAdmin={isAdmin}
                onEdit={() => { setEditingProduct(product); setIsModalOpen(true); }}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </main>

        {/* Carrinho Lateral: Só aparece para quem NÃO é admin */}
        {!isAdmin && (
          <aside className="w-full md:w-80 bg-white border-l border-gray-200 p-6 flex flex-col shadow-xl">
            <Cart 
              items={cart} 
              onRemove={removeFromCart} 
              onCheckout={handleCheckout} 
            />
          </aside>
        )}
      </div>

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