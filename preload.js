const { contextBridge, ipcRenderer, ipcMain } = require("electron");

contextBridge.exposeInMainWorld("donut", {
    loadPage : (page) => ipcRenderer.send("loadPage", page),
    getNetworkInfo : () => ipcRenderer.send("getNetworkInfo"),
    getNetworksInfo : () => ipcRenderer.send("getNetworksInfo"),

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