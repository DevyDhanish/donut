const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path");
const handlePage  = require("./pageHandler.js");
const networkHandler = require("./networkHandler.js");

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
    handlePage(mainWindow, "/pages/general/general.html");

    networkHandler.initNetwork();
    networkHandler.getCurrentNetworkTechnology();
}

ipcMain.on("loadPage", (event, page) => {
    handlePage(mainWindow, page);
})

app.whenReady().then(() => {
    createWindow();
})