const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path");
const handlePage  = require("./pageHandler.js");
const networkHandler = require("./networkHandler.js");
const nodeNotifier = require("node-notifier");

let notiFyLimit = 0;
let mainWindow = null;
let CONNTYPE = "5g";
var channel = 0;
var freq = 0;
var netSpeed = 0;

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
            event.reply("loadFileResponse", { success: false, error: err.message });
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

const fs = require('fs');
const FastSpeedtest = require('fast-speedtest-api');

async function writeDataToFile() {
    console.log("checking");
    try {
        let currentNetworkStats = await networkHandler.getNetwork();
        
        channel = currentNetworkStats[0].channel;
        freq = currentNetworkStats[0].frequency;
        netSpeed = 0;

        let speedtest = new FastSpeedtest({
            token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", 
            verbose: false, 
            timeout: 10000,
            https: true, 
            urlCount: 5, 
            bufferSize: 8, 
            unit: FastSpeedtest.UNITS.Mbps 
        });

        netSpeed = await speedtest.getSpeed();

        var dataToWrite = {
            "modelInput" : [freq, channel, netSpeed],
            "modelOutput" : [[]]
        }

        console.log(dataToWrite);

        const jsonData = JSON.stringify(dataToWrite);

        fs.writeFile("modeloutput.json", jsonData, (err) => {
            if (err) {
                // Handle error
                console.error("Error writing to file:", err);
            } else {
                console.log('Data written to file successfully.');
            }
        });
 
    } catch (error) {
        console.error(error);
    }
}

function check5gProb() {
    fs.readFile('modeloutput.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);

            let prog = jsonData["modelOutput"][0][0];

            if((freq > 5000 || channel > 20 || netSpeed > 60))
            {
                console.log("5g");
            }
            else
            {
                console.log("4g");
            }

        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
        }
    });
}

function execNotif(text)
{
    nodeNotifier.notify({
        title : "Notify",
        message : text,
        sound : true,
    }, (err, res, meta) => {});
}

function execExec(args)
{

}

function execDisConn(ssid)
{
    networkHandler.disconnectNetwork();
}

function execConn(ssid, password)
{

}

function execRule(rules)
{
    let counter = 0;

    if(rules[counter] != "if")
    {
        console.log("Invalid Rule");
    }

    counter++;

    if(rules[counter] == "connType")
    {
        counter++;

        if(rules[counter] == "5g" && CONNTYPE == "5g")
        {
            counter++; counter++; // skip the then

            if(rules[counter] == "notify")
            {
                counter++;
                execNotif(rules[counter]);
            }

            if(rules[counter] == "disConn")
            {
                execDisConn();
            }
        }

        if(rules[counter] == "4g" && CONNTYPE == "4g")
        {
            counter++; counter++; // skip the then

            if(rules[counter] == "notify")
            {
                counter++;
                execNotif(rules[counter]);
            }

            if(rules[counter] == "disConn")
            {
                execDisConn();
            }
        }
    }
}

function executeRules()
{
    let rules = 0;
    fs.readFile('rules.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);

            // calculate the prog

            rules = jsonData["rules"];

            for(let i = 0; i < rules.length; i++)
            {
                execRule(rules[i]);
            }

        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
        }
    });
}

setInterval(() => {
    writeDataToFile();
}, 30000); // Run every 10000 milliseconds (1 second)

setInterval(() => {
    check5gProb();
}, 10000);

setInterval(() => {
    executeRules();
}, 30000);

app.whenReady().then(() => {
    createWindow();
})

ipcMain.on("executeRules", (event, data) => {
    console.log(data);
})