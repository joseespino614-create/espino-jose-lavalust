import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit3, Trash2, Package, AlertCircle, 
  TrendingUp, Boxes, DollarSign, RefreshCw 
} from 'lucide-react';

export default function ProductList({ 
  products, 
  loading, 
  onRefresh, 
  onOpenAddModal, 
  onOpenEditModal, 
  onOpenDeleteModal 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all');

  // Compute Metrics
  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalItems = products.reduce((acc, p) => acc + (parseInt(p.quantity, 10) || 0), 0);
    const totalValue = products.reduce((acc, p) => acc + ((parseFloat(p.price) || 0) * (parseInt(p.quantity, 10) || 0)), 0);
    const lowStockCount = products.filter(p => (parseInt(p.quantity, 10) || 0) <= 10).length;

    return { totalProducts, totalItems, totalValue, lowStockCount };
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = 
        (p.product_name && p.product_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const qty = parseInt(p.quantity, 10) || 0;
      let matchStock = true;
      if (stockFilter === 'in_stock') matchStock = qty > 10;
      else if (stockFilter === 'low_stock') matchStock = qty > 0 && qty <= 10;
      else if (stockFilter === 'out_of_stock') matchStock = qty === 0;

      return matchSearch && matchStock;
    });
  }, [products, searchTerm, stockFilter]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(val || 0);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Page Title & Add Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '0.25rem' }}>
            Products Inventory
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage, track, and update product catalog records in real time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            id="btn-refresh-products"
            onClick={onRefresh}
            className="btn btn-secondary"
            title="Refresh product list"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <button
            id="btn-add-product"
            onClick={onOpenAddModal}
            className="btn btn-primary"
          >
            <Plus size={18} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Card 1: Total Products */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Total Products
            </span>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Package size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#ffffff' }}>
            {metrics.totalProducts}
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Active catalog entries
          </div>
        </div>

        {/* Card 2: Total Units */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Total Inventory Units
            </span>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Boxes size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#ffffff' }}>
            {metrics.totalItems.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Combined stock across items
          </div>
        </div>

        {/* Card 3: Valuation */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Inventory Valuation
            </span>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)', color: '#34d399',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#34d399' }}>
            {formatCurrency(metrics.totalValue)}
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Estimated total asset value
          </div>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Low Stock Alerts
            </span>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <AlertCircle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 700, color: metrics.lowStockCount > 0 ? '#fbbf24' : '#ffffff' }}>
            {metrics.lowStockCount}
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Items with 10 units or less
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{
        padding: '1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
          <Search size={16} color="var(--text-dim)" style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
          <input
            id="input-search-products"
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by product name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stock Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Filter:</span>
          {['all', 'in_stock', 'low_stock', 'out_of_stock'].map((f) => {
            const labels = {
              all: 'All',
              in_stock: 'In Stock (>10)',
              low_stock: 'Low Stock (≤10)',
              out_of_stock: 'Out of Stock'
            };
            const active = stockFilter === f;
            return (
              <button
                key={f}
                id={`filter-${f}`}
                type="button"
                onClick={() => setStockFilter(f)}
                className={`btn btn-sm ${active ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              >
                {labels[f]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Table Card */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div className="table-container">
          <table className="custom-table" id="products-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>ID</th>
                <th style={{ minWidth: '220px' }}>Product</th>
                <th style={{ minWidth: '260px' }}>Description</th>
                <th style={{ width: '130px' }}>Price</th>
                <th style={{ width: '130px' }}>Quantity</th>
                <th style={{ width: '130px' }}>Status</th>
                <th style={{ width: '130px' }}>Created</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && products.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'inline-block', marginBottom: '0.5rem' }}>⏳</div>
                    <div>Loading products from Aiven MySQL database...</div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--text-muted)' }}>
                    <Package size={40} color="var(--text-dim)" style={{ marginBottom: '0.75rem' }} />
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: '#e2e8f0', marginBottom: '0.25rem' }}>
                      {products.length === 0 ? 'No products in database yet.' : 'No matching products found.'}
                    </div>
                    <div style={{ fontSize: '0.85rem' }}>
                      {products.length === 0 
                        ? 'Click "Add New Product" to create your first catalog entry.'
                        : 'Try adjusting your search keyword or stock filter.'}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const qty = parseInt(product.quantity, 10) || 0;
                  const price = parseFloat(product.price) || 0;

                  return (
                    <tr key={product.id} id={`product-row-${product.id}`}>
                      {/* ID */}
                      <td style={{ color: 'var(--text-dim)', fontFamily: 'monospace', fontWeight: 600 }}>
                        #{product.id}
                      </td>

                      {/* Product Name */}
                      <td>
                        <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.95rem' }}>
                          {product.product_name}
                        </div>
                      </td>

                      {/* Description */}
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '300px' }}>
                        <span title={product.description} style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {product.description || '—'}
                        </span>
                      </td>

                      {/* Price */}
                      <td style={{ fontWeight: 700, color: '#38bdf8' }}>
                        {formatCurrency(price)}
                      </td>

                      {/* Quantity */}
                      <td style={{ fontWeight: 600, color: '#f1f5f9' }}>
                        {qty} units
                      </td>

                      {/* Stock Status Badge */}
                      <td>
                        {qty === 0 ? (
                          <span className="badge badge-danger">Out of Stock</span>
                        ) : qty <= 10 ? (
                          <span className="badge badge-warning">Low Stock ({qty})</span>
                        ) : (
                          <span className="badge badge-success">In Stock</span>
                        )}
                      </td>

                      {/* Created At */}
                      <td style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                        {formatDate(product.created_at)}
                      </td>

                      {/* Action Buttons */}
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button
                            id={`btn-edit-${product.id}`}
                            onClick={() => onOpenEditModal(product)}
                            className="btn btn-secondary btn-sm"
                            title="Edit Product"
                            style={{ padding: '0.4rem 0.6rem' }}
                          >
                            <Edit3 size={14} color="#38bdf8" />
                          </button>
                          <button
                            id={`btn-delete-${product.id}`}
                            onClick={() => onOpenDeleteModal(product)}
                            className="btn btn-secondary btn-sm"
                            title="Delete Product"
                            style={{ padding: '0.4rem 0.6rem' }}
                          >
                            <Trash2 size={14} color="#f43f5e" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
