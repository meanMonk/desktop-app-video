const { Menu } = require('electron');
const electron = require('electron');

const { app, BrowserWindow } = electron;


let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(`file://${__dirname}/main.html`);

  // setup menu;
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  
});


let menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add todo'
      },
      {
        label: 'Quit',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Command+Q'
          } else {
            return 'Ctrl+!'
          }
        }),
        click() {
          app.quit();
        }
      },
    ]
  }
]

if (process.platform === 'darwin') {
  menuTemplate = [ {
    label: ''
  }, ...menuTemplate ];
}
