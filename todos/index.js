const { Menu } = require('electron');
const electron = require('electron');

const { app, BrowserWindow , ipcMain} = electron;


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
    title: 'Add new todo',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  addWindow.loadURL(`file://${__dirname}/add.html`);
  // close the add window on operation completed;
  // to avoid the creating multiple instance of add window just clear the garbage.
  addWindow.on('closed', () => addWindow = null);
}

ipcMain.on('todo:add', (event, todo) => {
  console.log('todo:add', todo);
  mainWindow.webContents.send('todo:add', todo);
  addWindow.close()
})

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
