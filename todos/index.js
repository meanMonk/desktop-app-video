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
  // closing all the opened window of an application as app is exact process where 
  // electron node process is running!
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

// 'production'
// 'development'
// 'staging'
// 'test'
if (process.env.NODE_ENV !== 'production') {
  menuTemplate = [
    ...menuTemplate,
    {
      label: 'View',
      submenu: [
        {
          label: 'Developer tools',
          accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        }
      ]
    }
  ]
}
