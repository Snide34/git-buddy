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

// IPC Handlers
ipcMain.handle('get-config', () => {
  return store.get('config', {
    leetcodeUsername: '',
    githubUsername: '',
    monthlyQuestions: []
  });
});

ipcMain.handle('save-config', (event, config) => {
  store.set('config', config);
  return true;
});

ipcMain.handle('get-cache', (key) => {
  return store.get(`cache.${key}`);
});

ipcMain.handle('save-cache', (event, key, data) => {
  store.set(`cache.${key}`, data);
  return true;
});

ipcMain.handle('toggle-autolaunch', async (event, enable) => {
  if (enable) {
    await autoLauncher.enable();
  } else {
    await autoLauncher.disable();
  }
  return await autoLauncher.isEnabled();
});

ipcMain.handle('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.handle('close-window', () => {
  mainWindow.close();
});
