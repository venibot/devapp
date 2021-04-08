const { app, BrowserWindow, screen, Menu, MenuItem } = require("electron");
const root = __dirname;
let mainWindow;
const isMac = process.platform === "darwin";

const menuTemplate = [
    {
      label: "Справка",
      submenu: [
        {
          label: "Информация о версиях",
          click: () => {
            createWindow("versions.html", 640, 480);
          }
        }
      ]
    }
];

function createWindow(file = "index.html", width = null, height = null) {
    width = width != null ? width : screen.getPrimaryDisplay().workAreaSize.width;
    height = height != null ? height : screen.getPrimaryDisplay().workAreaSize.height;

    const window = new BrowserWindow({
        title: "VeniBot",
        width: width,
        height: height,
        webPreferences: {
          preload: root + '/preload.js'
        }
    });

    window.setMenu(Menu.buildFromTemplate(menuTemplate));

    window.loadFile(root + "/views/" + file);
    return window;
}

app.on("ready", () => {
    mainWindow = createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow()
        }
      });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
});