const { app, BrowserWindow } = require("electron")
const path = require("path")


function createWindow()
{
    const mainWindow = new BrowserWindow({
        title : "donut",
        width : 640,
        height : 800,
        autoHideMenuBar : true,
    })

    mainWindow.loadFile(path.join(__dirname, "\\pages\\main\\index.html"));
}

app.whenReady().then(() => {
    createWindow();
})