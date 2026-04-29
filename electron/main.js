const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const AutoLaunch = require('auto-launch');
const Store = require('electron-store');

const store = new Store();

// Auto-launch configuration
const autoLauncher = new AutoLaunch({
  name: 'DevWidget',
  path: app.getPath('exe'),
});

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: 500,
    height: 650,
    x: Math.floor((width - 500) / 2),
    y: Math.floor((height - 650) / 2),
    frame: true,
    transparent: false,
    alwaysOnTop: false,
    skipTaskbar: false,
    resizable: true,
    backgroundColor: '#1e293b',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the app
  const isDev = !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Make window draggable
  mainWindow.setIgnoreMouseEvents(false);
}

app.whenReady().then(() => {
  createWindow();

  // Enable auto-launch by default
  autoLauncher.isEnabled().then((isEnabled) => {
    if (!isEnabled) {
      autoLauncher.enable();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers with proper error handling
ipcMain.handle('get-config', (event) => {
  try {
    return store.get('config', {
      leetcodeUsername: '',
      githubUsername: '',
      githubToken: '',
      monthlyQuestions: []
    });
  } catch (error) {
    console.error('Error getting config:', error);
    return { error: error.message };
  }
});

ipcMain.handle('save-config', (event, config) => {
  try {
    if (!config || typeof config !== 'object') {
      throw new Error('Invalid config object');
    }
    store.set('config', config);
    return { success: true };
  } catch (error) {
    console.error('Error saving config:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-cache', (event, key) => {
  try {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid cache key');
    }
    return store.get(`cache.${key}`);
  } catch (error) {
    console.error('Error getting cache:', error);
    return { error: error.message };
  }
});

ipcMain.handle('save-cache', (event, key, data) => {
  try {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid cache key');
    }
    store.set(`cache.${key}`, data);
    return { success: true };
  } catch (error) {
    console.error('Error saving cache:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('toggle-autolaunch', async (event, enable) => {
  try {
    if (enable) {
      await autoLauncher.enable();
    } else {
      await autoLauncher.disable();
    }
    return await autoLauncher.isEnabled();
  } catch (error) {
    console.error('Error toggling autolaunch:', error);
    return { error: error.message };
  }
});

ipcMain.handle('minimize-window', (event) => {
  try {
    if (mainWindow) {
      mainWindow.minimize();
    }
    return { success: true };
  } catch (error) {
    console.error('Error minimizing window:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('close-window', (event) => {
  try {
    if (mainWindow) {
      mainWindow.close();
    }
    return { success: true };
  } catch (error) {
    console.error('Error closing window:', error);
    return { success: false, error: error.message };
  }
});
