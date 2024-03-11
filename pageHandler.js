const {BrowserWindow} = require("electron");
const {path} = require("path");

function handlePage(window, page)
{
    window.loadFile(path.join(__dirname, page));
}