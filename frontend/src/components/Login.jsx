import React, { useState } from 'react';
import { Package, Lock, User, Eye, EyeOff, ArrowRight, Settings, Globe, ChevronDown, ChevronUp, Check, AlertCircle } from 'lucide-react';
import { apiService, getBaseApiUrl, setBaseApiUrl } from '../services/api';
import axios from 'axios';

const RENDER_URL = 'https://espino-jose-lavalust-api.onrender.com/api';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Base URL config state
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [apiUrl, setApiUrl] = useState(getBaseApiUrl());
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Auto-save API URL before login attempt
    setBaseApiUrl(apiUrl);

    try {
      setLoading(true);
      setError('');
      const data = await apiService.login(username, password);

      if (data.token) {
        localStorage.setItem('lavalust_jwt_token', data.token);
        localStorage.setItem('lavalust_user', JSON.stringify(data.user || { username }));
        onLoginSuccess(data.user || { username }, data.token);
      } else {
        setError('Login failed: Token was not returned by server.');
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.error || 
                  err.response?.data?.message || 
                  err.message || 
                  'Failed to connect to LavaLust API. Check network or API URL.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  const handleTestConnection = async () => {
    try {
      setTestingConnection(true);
      setTestResult(null);
      const target = apiUrl.trim().replace(/\/+$/, '');
      const startTime = performance.now();
      const res = await axios.get(`${target}/products`, { timeout: 8000 }).catch(err => {
        if (err.response) return err.response;
        throw err;
      });
      const latency = Math.round(performance.now() - startTime);

      if (res && (res.status === 200 || res.status === 401 || res.status === 404)) {
        setTestResult({
          success: true,
          message: `Connected in ${latency}ms (Status: ${res.status})`
        });
        // Auto-save on successful test
        setBaseApiUrl(apiUrl);
      } else {
        setTestResult({
          success: false,
          message: `Unexpected response: HTTP ${res?.status || 'Unknown'}`
        });
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: `Connection failed: ${err.message}`
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSetPreset = (url) => {
    setApiUrl(url);
    setBaseApiUrl(url);
    setTestResult(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      position: 'relative'
    }}>
      {/* Background Glow Blobs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '30%',
        width: '320px',
        height: '320px',
        background: 'rgba(99, 102, 241, 0.15)',
        filter: 'blur(100px)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '30%',
        width: '300px',
        height: '300px',
        background: 'rgba(6, 182, 212, 0.12)',
        filter: 'blur(100px)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '460px',
        padding: '2.5rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
          }}>
            <Package size={28} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.4rem', color: '#f8fafc' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Product Management System · Laboratory 6
          </p>
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
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="var(--text-dim)" style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)'
              }} />
              <input
                id="input-username"
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-dim)" style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)'
              }} />
              <input
                id="input-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                id="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* ─── Inline Base URL Configuration ─── */}
          <div style={{
            marginTop: '0.75rem',
            marginBottom: '0.75rem',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${showApiConfig ? 'rgba(99, 102, 241, 0.3)' : 'var(--border-subtle)'}`,
            background: showApiConfig ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.02)',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            {/* Toggle Header */}
            <button
              type="button"
              id="btn-toggle-api-config"
              onClick={() => setShowApiConfig(!showApiConfig)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings size={14} style={{ color: '#818cf8' }} />
                <span>API Base URL</span>
                <span style={{
                  fontSize: '0.65rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                  background: apiUrl.includes('onrender.com') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                  color: apiUrl.includes('onrender.com') ? '#34d399' : '#fbbf24',
                  fontWeight: 600
                }}>
                  {apiUrl.includes('onrender.com') ? 'Render' : 'Custom'}
                </span>
              </div>
              {showApiConfig ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {/* Expanded Config Panel */}
            {showApiConfig && (
              <div style={{
                padding: '0 0.85rem 0.85rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                {/* Preset Buttons */}
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', marginBottom: '0.65rem' }}>
                  <button
                    type="button"
                    id="btn-preset-render"
                    onClick={() => handleSetPreset(RENDER_URL)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: apiUrl === RENDER_URL ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid var(--border-subtle)',
                      background: apiUrl === RENDER_URL ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                      color: apiUrl === RENDER_URL ? '#a5b4fc' : 'var(--text-dim)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Globe size={12} />
                    Render (Production)
                  </button>
                  <button
                    type="button"
                    id="btn-preset-local"
                    onClick={() => handleSetPreset('http://localhost/LavaLust/api')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: apiUrl.includes('localhost') ? '1px solid rgba(251, 191, 36, 0.5)' : '1px solid var(--border-subtle)',
                      background: apiUrl.includes('localhost') ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255,255,255,0.03)',
                      color: apiUrl.includes('localhost') ? '#fbbf24' : 'var(--text-dim)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Settings size={12} />
                    Local (Dev)
                  </button>
                </div>

                {/* URL Input */}
                <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                  <Globe size={14} color="var(--text-dim)" style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }} />
                  <input
                    id="input-api-base-url"
                    type="url"
                    className="form-input"
                    style={{
                      paddingLeft: '2.25rem',
                      fontSize: '0.78rem',
                      padding: '0.55rem 0.75rem 0.55rem 2.25rem'
                    }}
                    placeholder="https://your-api.onrender.com/api"
                    value={apiUrl}
                    onChange={(e) => {
                      setApiUrl(e.target.value);
                      setTestResult(null);
                    }}
                  />
                </div>

                {/* Test Result */}
                {testResult && (
                  <div style={{
                    padding: '0.4rem 0.65rem',
                    borderRadius: '6px',
                    background: testResult.success ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
                    border: `1px solid ${testResult.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
                    color: testResult.success ? '#34d399' : '#fb7185',
                    fontSize: '0.725rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    marginBottom: '0.5rem'
                  }}>
                    {testResult.success ? <Check size={13} /> : <AlertCircle size={13} />}
                    <span>{testResult.message}</span>
                  </div>
                )}

                {/* Test + Save Actions */}
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    type="button"
                    id="btn-test-api-connection"
                    onClick={handleTestConnection}
                    disabled={testingConnection || !apiUrl.trim()}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: testingConnection ? 'wait' : 'pointer',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      background: 'rgba(6, 182, 212, 0.1)',
                      color: '#67e8f9',
                      transition: 'all 0.2s ease',
                      opacity: testingConnection ? 0.6 : 1
                    }}
                  >
                    {testingConnection ? '⏳ Testing...' : '🔌 Test Connection'}
                  </button>
                  <button
                    type="button"
                    id="btn-save-api-url"
                    onClick={() => {
                      setBaseApiUrl(apiUrl);
                      setTestResult({ success: true, message: 'URL saved!' });
                      setTimeout(() => setTestResult(null), 2000);
                    }}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#34d399',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    💾 Save URL
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            id="btn-submit-login"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.25rem', padding: '0.85rem' }}
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Quick Credentials Box */}
        <div style={{
          marginTop: '1.75rem',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.8rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>Default Admin Credentials:</span>
            <button
              id="btn-quick-fill"
              type="button"
              onClick={handleQuickFill}
              style={{
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#a5b4fc',
                borderRadius: '6px',
                padding: '0.2rem 0.5rem',
                fontSize: '0.725rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Autofill
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-muted)' }}>
            <div>Username: <strong style={{ color: '#e2e8f0' }}>admin</strong></div>
            <div>Password: <strong style={{ color: '#e2e8f0' }}>admin123</strong></div>
          </div>
        </div>

        </div>
    </div>
  );
}
