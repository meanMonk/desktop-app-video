const { Menu } = require('electron');
const electron = require('electron');

const { app, BrowserWindow } = electron;


let mainWindow;
let addWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());
  // setup menu;
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add new todo'
  });
  
  addWindow.loadURL(`file://${__dirname}/add.html`);
}

let menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        click() {
          createAddWindow()
        }
      },
      {
        label: 'Quit',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Command+Q'
          } else {
            return 'Ctrl+!'
          }
        })(),
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
