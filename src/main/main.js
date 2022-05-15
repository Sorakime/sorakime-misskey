const {app, BrowserView, BrowserWindow} = require('electron');
let win, dev, _04si;
let isMac = process.platform === 'darwin';

function newWin() {
  win = new BrowserWindow({
    width: 700,
    height: 700
  });
}

app.on('ready', () => {
  newWin();

  // misskey.dev
  dev = new BrowserView({
    webPreferences: {
      scrollBounce: true
    }
  });
  dev.webContents.loadURL('https://misskey.dev/');
  win.addBrowserView(dev);
  dev.setBounds({
    width: win.getContentSize()[0] / 2,
    height: win.getContentSize()[1],
    x: 0,
    y: 0
  });
  dev.setAutoResize({
    horizontal: true,
    vertical: true
  });
  dev.webContents.on('dom-ready', () => {
    dev.webContents.setVisualZoomLevelLimits(1, 10);
  });

  // misskey.04.si
  _04si = new BrowserView({
    webPreferences: {
      scrollBounce: true
    }
  });
  _04si.webContents.loadURL('https://misskey.04.si/');
  win.addBrowserView(_04si);
  _04si.setBounds({
    width: win.getContentSize()[0] / 2,
    height: win.getContentSize()[1],
    x: win.getContentSize()[0] / 2,
    y: 0
  });
  _04si.setAutoResize({
    horizontal: true,
    vertical: true
  });
  _04si.webContents.on('dom-ready', () => {
    _04si.webContents.setVisualZoomLevelLimits(1, 10);
  })
});

app.on('activate', () => {
  if (win === null) newWin();
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
  win = null;
});
