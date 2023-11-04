const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  let isGhostModeActive = false;
  const iconPath = path.join(__dirname, "..", "icon.ico");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  const tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Ghost Mode",
      type: "checkbox",
      checked: isGhostModeActive,
      click: () => {
        mainWindow.setIgnoreMouseEvents(!isGhostModeActive);
        isGhostModeActive = !isGhostModeActive;
      },
    },
  ]);

  tray.setToolTip("Ghost Cam");
  tray.on("click", () => tray.popUpContextMenu());
  tray.setContextMenu(contextMenu);
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
