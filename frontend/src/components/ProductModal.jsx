import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, PlusCircle, Edit3 } from 'lucide-react';

export default function ProductModal({ isOpen, mode, product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && product) {
        setFormData({
          product_name: product.product_name || '',
          description: product.description || '',
          price: product.price !== undefined ? product.price : '',
          quantity: product.quantity !== undefined ? product.quantity : ''
        });
      } else {
        setFormData({
          product_name: '',
          description: '',
          price: '',
          quantity: ''
        });
      }
      setError('');
    }
  }, [isOpen, mode, product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.product_name.trim()) {
      setError('Product Name is required.');
      return;
    }
    if (formData.price === '' || isNaN(formData.price) || parseFloat(formData.price) < 0) {
      setError('Please provide a valid non-negative Price.');
      return;
    }
    if (formData.quantity === '' || isNaN(formData.quantity) || parseInt(formData.quantity, 10) < 0) {
      setError('Please provide a valid non-negative Quantity.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        product_name: formData.product_name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10)
      };

      await onSave(payload, mode === 'edit' ? product.id : null);
      onClose();
    } catch (err) {
      console.error('Save product error:', err);
      const msg = err.response?.data?.error || 
                  err.response?.data?.message || 
                  err.message || 
                  'Failed to save product.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: mode === 'edit' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(99, 102, 241, 0.15)',
              color: mode === 'edit' ? '#38bdf8' : '#818cf8',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {mode === 'edit' ? <Edit3 size={18} /> : <PlusCircle size={18} />}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#f8fafc' }}>
                {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {mode === 'edit' ? `Updating ID #${product?.id}` : 'Fill in the product details below'}
              </p>
            </div>
          </div>
          <button
            id="btn-close-modal"
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              padding: '0.35rem'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fb7185',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="product_name">
              Product Name *
            </label>
            <input
              id="input-product-name"
              name="product_name"
              type="text"
              className="form-input"
              placeholder="e.g. MacBook Pro M3"
              value={formData.product_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="input-product-description"
              name="description"
              className="form-textarea"
              placeholder="e.g. 16-inch Liquid Retina XDR display, 36GB unified memory, 512GB SSD"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Price & Quantity Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="price">
                Price (PHP ₱) *
              </label>
              <input
                id="input-product-price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                className="form-input"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="quantity">
                Quantity *
              </label>
              <input
                id="input-product-quantity"
                name="quantity"
                type="number"
                min="0"
                step="1"
                className="form-input"
                placeholder="0"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <button
              type="button"
              id="btn-cancel-product"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="btn-save-product"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save size={16} />
                  <span>{mode === 'edit' ? 'Update Product' : 'Create Product'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
