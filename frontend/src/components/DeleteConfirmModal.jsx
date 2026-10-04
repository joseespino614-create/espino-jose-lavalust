import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, product, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError('');
      await onConfirm(product.id);
      onClose();
    } catch (err) {
      console.error('Delete product error:', err);
      const msg = err.response?.data?.error || 
                  err.response?.data?.message || 
                  err.message || 
                  'Failed to delete product.';
      setError(msg);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '0.85rem'
          }}>
            <AlertTriangle size={26} />
          </div>
          <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', marginBottom: '0.35rem' }}>
            Delete Product?
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Are you sure you want to permanently remove this product from the database?
          </p>
        </div>

        {/* Product Summary Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.875rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>Product ID:</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>#{product.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>Name:</span>
            <strong style={{ color: '#f8fafc' }}>{product.product_name}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-dim)' }}>Stock:</span>
            <span>{product.quantity} units</span>
          </div>
        </div>

        {error && (
          <div style={{
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fb7185',
            fontSize: '0.825rem',
            marginBottom: '1.25rem'
          }}>
            {error}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            id="btn-cancel-delete"
            onClick={onClose}
            className="btn btn-secondary"
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            id="btn-confirm-delete"
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={deleting}
          >
            {deleting ? (
              <span>Deleting...</span>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Delete Permanently</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
