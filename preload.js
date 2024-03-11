const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("donut", {
    loadPage : (page) => ipcRenderer.send("loadPage", page),
})