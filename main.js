const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path");
const handlePage  = require("./pageHandler.js");
const networkHandler = require("./networkHandler.js");
const fs = require("fs");

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

ipcMain.on("writeToFile", (event, filepath, data) => {
    const jsonData = JSON.stringify(data);

    fs.writeFile(filepath, jsonData, (err) => {
        if (err) {
            // Handle error
            console.error("Error writing to file:", err);
            event.reply('writeToFileResponse', { success: false, error: err.message });
        } else {
            console.log('Data written to file successfully.');
            event.reply('writeToFileResponse', { success: true });
        }
    });
})

ipcMain.on("loadFromFile", (event, filePath) => {
    // Read data from the JSON file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            event.reply('loadFileResponse', { success: false, error: err.message });
        } else {
            try {
                const jsonData = JSON.parse(data);
                event.reply('loadFileResponse', jsonData);
            } catch (parseErr) {
                console.error("Error parsing JSON:", parseErr);
            }
        }
    });
});

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

ipcMain.on("networkConnect", (event, _ssid, _password) => {
    networkHandler.connectNetwork(_ssid, _password);
})

ipcMain.on("getNetworksInfo", (event) => {
    let allNets = networkHandler.getNetworks().then((info) => {
        console.log(info);
        event.reply("netscan-info-main", info);
    }).catch(() => {
        console.log("failed");
    });
})

app.whenReady().then(() => {
    createWindow();
})