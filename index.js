const { app, BrowserWindow, ipcMain } = require('electron');
const ffmpeg = require('fluent-ffmpeg');

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadURL(`file://${__dirname}/index.html`);
})


ipcMain.on('video:submit', (event, path) => {
  console.log(`Hurray!!, data recieved from browser`);
  console.log(path);
  ffmpeg.ffprobe(path, (err, meta) => {
    console.log(`Video information =>`, meta.format.duration);
    mainWindow.webContents.send("video:duration", meta.format.duration);
  })
})
