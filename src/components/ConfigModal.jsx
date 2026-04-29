import React, { useState } from 'react';

function ConfigModal({ config, onSave, onClose }) {
  const [formData, setFormData] = useState({
    leetcodeUsername: config?.leetcodeUsername || '',
    githubUsername: config?.githubUsername || '',
    githubToken: config?.githubToken || '',
    autoLaunch: config?.autoLaunch !== false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validate LeetCode username
    if (formData.leetcodeUsername && !/^[a-zA-Z0-9_-]+$/.test(formData.leetcodeUsername)) {
      newErrors.leetcodeUsername = 'Invalid username format';
    }

    // Validate GitHub username
    if (formData.githubUsername && !/^[a-zA-Z0-9-]+$/.test(formData.githubUsername)) {
      newErrors.githubUsername = 'Invalid username format';
    }

    // At least one username required
    if (!formData.leetcodeUsername && !formData.githubUsername) {
      newErrors.general = 'Please enter at least one username';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      onSave(formData);
    } catch (error) {
      setErrors({ general: error.message || 'Failed to save configuration' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="modal-content" style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '28px',
        width: '90%',
        maxWidth: '420px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}>
        <div className="modal-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '22px', color: 'white', fontWeight: '700', margin: 0 }}>⚙️ Settings</h2>
          <button onClick={onClose} className="close-btn" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '24px',
            cursor: 'pointer',
            lineHeight: 1,
            padding: 0,
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            transition: 'all 0.2s'
          }}>×</button>
        </div>
        
        {errors.general && (
          <div style={{
            background: 'rgba(255, 0, 0, 0.1)',
            border: '1px solid rgba(255, 0, 0, 0.3)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '12px',
            color: '#FF6B6B'
          }}>
            ⚠️ {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="config-form" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          <div className="form-group" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>LeetCode Username</label>
            <input
              type="text"
              value={formData.leetcodeUsername}
              onChange={(e) => setFormData({ ...formData, leetcodeUsername: e.target.value })}
              placeholder="e.g., john_doe"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: errors.leetcodeUsername ? '1px solid #FF6B6B' : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '12px 14px',
                color: 'white',
                fontSize: '14px',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
              onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.06)'}
            />
            {errors.leetcodeUsername && (
              <small style={{ fontSize: '11px', color: '#FF6B6B' }}>{errors.leetcodeUsername}</small>
            )}
          </div>

          <div className="form-group" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>GitHub Username</label>
            <input
              type="text"
              value={formData.githubUsername}
              onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
              placeholder="e.g., john_doe"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: errors.githubUsername ? '1px solid #FF6B6B' : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '12px 14px',
                color: 'white',
                fontSize: '14px',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
              onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.06)'}
            />
            {errors.githubUsername && (
              <small style={{ fontSize: '11px', color: '#FF6B6B' }}>{errors.githubUsername}</small>
            )}
          </div>

          <div className="form-group" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>GitHub Token (Optional)</label>
            <input
              type="password"
              value={formData.githubToken}
              onChange={(e) => setFormData({ ...formData, githubToken: e.target.value })}
              placeholder="ghp_xxxxxxxxxxxx"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '12px 14px',
                color: 'white',
                fontSize: '14px',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
              onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.06)'}
            />
            <small style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', lineHeight: '1.4' }}>
              For accessing private repositories. Leave blank for public access only.
            </small>
          </div>

          <div className="form-group checkbox" style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: '600'
            }}>
              <input
                type="checkbox"
                checked={formData.autoLaunch}
                onChange={(e) => setFormData({ ...formData, autoLaunch: e.target.checked })}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: '#8b5cf6'
                }}
              />
              Launch on startup
            </label>
          </div>

          <div className="form-actions" style={{
            display: 'flex',
            gap: '12px',
            marginTop: '8px'
          }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.3px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)')}
              onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)')}
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                letterSpacing: '0.3px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.85)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.12)', e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
              onMouseLeave={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.08)', e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfigModal;
