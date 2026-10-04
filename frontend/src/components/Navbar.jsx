import React from 'react';
import { Package, LogOut, User, Globe, Server } from 'lucide-react';
import { getBaseApiUrl } from '../services/api';

export default function Navbar({ user, onLogout, onOpenApiSettings }) {
  const currentApiUrl = getBaseApiUrl();
  const isRender = currentApiUrl.includes('onrender.com');

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)'
          }}>
            <Package size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ProductMaster
              </span>
              <span className="badge badge-info" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                LavaLust API
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Full-Stack CRUD System · Lab 6
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* API Environment Switcher Button */}
          <button
            id="btn-api-settings"
            onClick={onOpenApiSettings}
            className="btn btn-secondary btn-sm"
            title="Configure or Switch API URL (Local vs Render)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.775rem',
              padding: '0.35rem 0.75rem'
            }}
          >
            {isRender ? (
              <>
                <Globe size={14} color="#06b6d4" />
                <span style={{ color: '#38bdf8' }}>Render API</span>
              </>
            ) : (
              <>
                <Server size={14} color="#a5b4fc" />
                <span>Local API</span>
              </>
            )}
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }} />
          </button>

          {/* User Badge */}
          {user && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.825rem'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a5b4fc'
              }}>
                <User size={13} />
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                {user.username}
              </span>
            </div>
          )}

          {/* Logout Button */}
          <button
            id="btn-logout"
            onClick={onLogout}
            className="btn btn-secondary btn-sm"
            style={{ color: '#fda4af' }}
            title="Log out of application"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
