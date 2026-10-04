import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ApiSettingsModal from './components/ApiSettingsModal';
import { apiService } from './services/api';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('lavalust_jwt_token') || null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lavalust_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modals state
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'create', product: null });
  const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, product: null });
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await apiService.getProducts();
      if (res && res.data) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error('Fetch products error:', err);
      showToast(err.response?.data?.error || err.message || 'Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  }, [token, showToast]);

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token, fetchProducts]);

  // Listen for 401 unauthorized events from Axios interceptor
  useEffect(() => {
    const handleUnauthorized = () => {
      setToken(null);
      setUser(null);
      showToast('Session expired or unauthorized. Please log in again.', 'error');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [showToast]);

  // Auth handlers
  const handleLoginSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    showToast(`Welcome back, ${userData.username || 'User'}!`, 'success');
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (e) {
      console.warn('Logout notice:', e);
    } finally {
      setToken(null);
      setUser(null);
      setProducts([]);
      showToast('You have been logged out.', 'success');
    }
  };

  // Product CRUD Handlers
  const handleSaveProduct = async (productData, id) => {
    if (id) {
      // Update
      const res = await apiService.updateProduct(id, productData);
      showToast('Product updated successfully!', 'success');
      // Update local state immediately
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...res.data } : p)));
    } else {
      // Create
      const res = await apiService.createProduct(productData);
      showToast('Product added successfully!', 'success');
      // Prepend to local state
      if (res.data) {
        setProducts((prev) => [res.data, ...prev]);
      }
    }
    // Background refresh to sync with Aiven MySQL
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    await apiService.deleteProduct(id);
    showToast('Product removed from database.', 'success');
    setProducts((prev) => prev.filter((p) => p.id !== id));
    fetchProducts();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* If logged in, show Navbar */}
      {token && (
        <Navbar
          user={user}
          onLogout={handleLogout}
          onOpenApiSettings={() => setApiSettingsOpen(true)}
        />
      )}

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {!token ? (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onOpenApiSettings={() => setApiSettingsOpen(true)}
          />
        ) : (
          <ProductList
            products={products}
            loading={loading}
            onRefresh={fetchProducts}
            onOpenAddModal={() => setModalState({ isOpen: true, mode: 'create', product: null })}
            onOpenEditModal={(product) => setModalState({ isOpen: true, mode: 'edit', product })}
            onOpenDeleteModal={(product) => setDeleteModalState({ isOpen: true, product })}
          />
        )}
      </main>

      {/* Modals */}
      <ProductModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        product={modalState.product}
        onClose={() => setModalState({ isOpen: false, mode: 'create', product: null })}
        onSave={handleSaveProduct}
      />

      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        product={deleteModalState.product}
        onClose={() => setDeleteModalState({ isOpen: false, product: null })}
        onConfirm={handleDeleteProduct}
      />

      <ApiSettingsModal
        isOpen={apiSettingsOpen}
        onClose={() => setApiSettingsOpen(false)}
        onApiUrlChanged={() => {
          showToast('API URL updated!', 'success');
          if (token) fetchProducts();
        }}
      />

      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} color="#10b981" />
            ) : (
              <AlertCircle size={18} color="#f43f5e" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
