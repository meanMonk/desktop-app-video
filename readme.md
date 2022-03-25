#IPC : 
  Inter process communication
  - can have access through the electron module.
  - require is available in node side as it uses common js but not in the browser.
  - so we can use file system / any other node package via electron.


```
  Browser                   ELECTRON

  ipcRenderer.send ===> ipcMain.on
  
  ipcRenderer.on <=== mainWindow.webContents.send

```
