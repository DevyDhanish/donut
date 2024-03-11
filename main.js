const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path");
const { handlePage } = require("./pageHandler");

let mainWindow = null;

function createWindow()
{
    mainWindow = new BrowserWindow({
        title : "donut",
        width : 640,
        height : 800,
        autoHideMenuBar : true,

        webPreferences : {
            preload : path.join(__dirname, "preload.js"),
        }
    })

    mainWindow.loadFile(path.join(__dirname, "\\pages\\main\\index.html"));
}

ipcMain.on("loadPage", (page) => {
    handlePage(window, page);
})

app.whenReady().then(() => {
    createWindow();
})