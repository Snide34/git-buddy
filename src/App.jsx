import React, { useState, useEffect } from 'react';
import Widget from './components/Widget';
import ConfigModal from './components/ConfigModal';
import { fetchLeetCodeData } from './services/leetcode';
import { fetchGitHubData } from './services/github';
import { calculateDailyScore } from './services/scoreEngine';

function App() {
  const [config, setConfig] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [data, setData] = useState({
    leetcode: null,
    github: null,
    score: 0,
    streak: 0,
    loading: true
  });

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    if (config?.leetcodeUsername && config?.githubUsername) {
      fetchData();
      const interval = setInterval(fetchData, 30 * 60 * 1000); // Refresh every 30 min
      return () => clearInterval(interval);
    }
  }, [config]);

  const loadConfig = async () => {
    const savedConfig = await window.electron.getConfig();
    setConfig(savedConfig);
    
    if (!savedConfig.leetcodeUsername || !savedConfig.githubUsername) {
      setShowConfig(true);
    }
  };

  const fetchData = async () => {
    setData(prev => ({ ...prev, loading: true }));

    try {
      const [leetcodeData, githubData] = await Promise.all([
        fetchLeetCodeData(config.leetcodeUsername),
        fetchGitHubData(config.githubUsername)
      ]);

      const score = calculateDailyScore(leetcodeData, githubData);
      const cachedStreak = await window.electron.getCache('streak') || 0;
      
      // Update streak logic
      const today = new Date().toDateString();
      const lastActive = await window.electron.getCache('lastActive');
      let newStreak = cachedStreak;

      if (lastActive !== today && score > 0) {
        newStreak = cachedStreak + 1;
        await window.electron.saveCache('streak', newStreak);
        await window.electron.saveCache('lastActive', today);
      }

      setData({
        leetcode: leetcodeData,
        github: githubData,
        score,
        streak: newStreak,
        loading: false
      });

      // Cache the data
      await window.electron.saveCache('lastData', {
        leetcode: leetcodeData,
        github: githubData,
        score,
        streak: newStreak,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      
      // Load from cache on error
      const cached = await window.electron.getCache('lastData');
      if (cached) {
        setData({ ...cached, loading: false });
      } else {
        setData(prev => ({ ...prev, loading: false }));
      }
    }
  };

  const handleSaveConfig = async (newConfig) => {
    await window.electron.saveConfig(newConfig);
    setConfig(newConfig);
    setShowConfig(false);
    fetchData();
  };

  return (
    <div className="app">
      <Widget 
        data={data}
        onSettings={() => setShowConfig(true)}
        onRefresh={fetchData}
      />
      
      {showConfig && (
        <ConfigModal
          config={config}
          onSave={handleSaveConfig}
          onClose={() => setShowConfig(false)}
        />
      )}
    </div>
  );
}

export default App;
