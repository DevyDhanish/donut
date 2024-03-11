const { contextBridge, ipcRenderer, ipcMain } = require("electron");

contextBridge.exposeInMainWorld("donut", {
    loadPage : (page) => ipcRenderer.send("loadPage", page),
    getNetworkInfo : () => ipcRenderer.send("getNetworkInfo"),
    getNetworksInfo : () => ipcRenderer.send("getNetworksInfo"),

    writeToFile : (filepath, data) => ipcRenderer.send("writeToFile", filepath, data),
    writeFromFile : (data) => ipcRenderer.send("loadFromFile", data),

    networkConnect : (_ssid, _password) => ipcRenderer.send("networkConnect", _ssid, _password),

    getFileData : (callback) => {
        ipcRenderer.on("loadFileResponse", (event, data) => {
            callback(data);
        })
    },

    reveiveNetInfo : (callback) => {
        ipcRenderer.on("net-info-main", (event, data) => {
            callback(data);
        })
    },

    reveiveNetsInfo : (callback) => {
        ipcRenderer.on("netscan-info-main", (event, data) => {
            callback(data);
        })
    }
})