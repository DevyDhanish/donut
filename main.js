const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path");
const handlePage  = require("./pageHandler.js");
const networkHandler = require("./networkHandler.js");

let mainWindow = null;

function createWindow()
{
    mainWindow = new BrowserWindow({
        title : "donut",
        width : 1200,
        height : 800,
        autoHideMenuBar : true,

        webPreferences : {
            preload : path.join(__dirname, "preload.js"),
        }
    })

    mainWindow.loadFile(path.join(__dirname, "\\pages\\main\\index.html"));
    handlePage(mainWindow, "/pages/general/general.html");

    networkHandler.initNetwork();
}

ipcMain.on("loadPage", (event, page) => {
    handlePage(mainWindow, page);
})

ipcMain.on("getNetworkInfo", (event) => {
    let currentNetworkStats = networkHandler.getNetwork().then((info) => {
        event.reply("net-info-main", info);
    }).catch(() => {
        console.log("failed");
    });
})

ipcMain.on("getNetworksInfo", (event) => {
    let allNets = networkHandler.getNetworks().then((info) => {
        event.reply("netscan-info-main", info);
    }).catch(() => {
        console.log("failed");
    });
})

app.whenReady().then(() => {
    createWindow();
})