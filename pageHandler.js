const {BrowserWindow} = require("electron");
const path = require("path");

function handlePage(window, page)
{
    console.log(page);
    window.loadFile(path.join(__dirname, page));
}

module.exports = handlePage;