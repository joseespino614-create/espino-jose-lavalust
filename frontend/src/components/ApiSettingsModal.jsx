import React, { useState } from 'react';
import { Settings, Globe, Server, Check, X, AlertCircle } from 'lucide-react';
import { getBaseApiUrl, setBaseApiUrl } from '../services/api';
import axios from 'axios';

export default function ApiSettingsModal({ isOpen, onClose, onApiUrlChanged }) {
  const currentUrl = getBaseApiUrl();
  const [apiUrl, setApiUrl] = useState(currentUrl);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handlePreset = (url) => {
    setApiUrl(url);
    setTestResult(null);
  };

  const handleTestConnection = async () => {
    try {
      setTesting(true);
      setTestResult(null);
      const startTime = performance.now();
      // Test hitting base or /me or products or index
      const target = apiUrl.trim().replace(/\/+$/, '');
      const res = await axios.get(`${target}/products`, { timeout: 8000 }).catch(err => {
        // Even 401 is success (proves API exists and is alive!)
        if (err.response) return err.response;
        throw err;
      });
      const latency = Math.round(performance.now() - startTime);

      if (res && (res.status === 200 || res.status === 401 || res.status === 404)) {
        setTestResult({
          success: true,
          message: `API reached successfully in ${latency}ms (Status: ${res.status})`
        });
      } else {
        setTestResult({
          success: false,
          message: `Unexpected response from server: HTTP ${res?.status || 'Unknown'}`
        });
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: `Connection failed: ${err.message}. Check CORS or server status.`
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    const saved = setBaseApiUrl(apiUrl);
    if (onApiUrlChanged) onApiUrlChanged(saved);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Settings size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#f8fafc' }}>API Configuration</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Switch between Local development and Render deployed backend
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: 'var(--text-dim)',
              cursor: 'pointer', padding: '0.35rem'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Presets */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
            Quick Select Preset
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => handlePreset('http://localhost/LavaLust/api')}
              className={`btn btn-sm ${apiUrl.includes('127.0.0.1') || apiUrl.includes('localhost') ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.65rem', justifyContent: 'flex-start' }}
            >
              <Server size={15} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>Local (XAMPP)</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>localhost/LavaLust/api</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handlePreset('https://espino-jose-lavalust-api.onrender.com/api')}
              className={`btn btn-sm ${apiUrl.includes('onrender.com') ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.65rem', justifyContent: 'flex-start' }}
            >
              <Globe size={15} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>Render Deployed</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>espino-jose-lavalust-api.onrender.com</div>
              </div>
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label className="form-label" htmlFor="api_url">
            LavaLust API Base URL
          </label>
          <input
            id="input-api-url"
            type="url"
            className="form-input"
            value={apiUrl}
            onChange={(e) => {
              setApiUrl(e.target.value);
              setTestResult(null);
            }}
            placeholder="https://espino-jose-lavalust-api.onrender.com/api"
          />
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div style={{
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            background: testResult.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
            border: `1px solid ${testResult.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
            color: testResult.success ? '#34d399' : '#fb7185',
            fontSize: '0.825rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {testResult.success ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{testResult.message}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <button
            type="button"
            onClick={handleTestConnection}
            className="btn btn-secondary btn-sm"
            disabled={testing}
          >
            {testing ? 'Testing...' : 'Test Connection'}
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary btn-sm"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
