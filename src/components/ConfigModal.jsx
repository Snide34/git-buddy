import React, { useState } from 'react';

function ConfigModal({ config, onSave, onClose }) {
  const [formData, setFormData] = useState({
    leetcodeUsername: config?.leetcodeUsername || '',
    githubUsername: config?.githubUsername || '',
    githubToken: config?.githubToken || '',
    autoLaunch: config?.autoLaunch !== false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>⚙️ Settings</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="config-form">
          <div className="form-group">
            <label>LeetCode Username</label>
            <input
              type="text"
              value={formData.leetcodeUsername}
              onChange={(e) => setFormData({ ...formData, leetcodeUsername: e.target.value })}
              placeholder="your-username"
              required
            />
          </div>

          <div className="form-group">
            <label>GitHub Username</label>
            <input
              type="text"
              value={formData.githubUsername}
              onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
              placeholder="your-username"
              required
            />
          </div>

          <div className="form-group">
            <label>GitHub Token (Optional)</label>
            <input
              type="password"
              value={formData.githubToken}
              onChange={(e) => setFormData({ ...formData, githubToken: e.target.value })}
              placeholder="ghp_xxxxxxxxxxxx"
            />
            <small>For private repos and higher rate limits</small>
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={formData.autoLaunch}
                onChange={(e) => setFormData({ ...formData, autoLaunch: e.target.checked })}
              />
              <span>Launch at startup</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfigModal;
