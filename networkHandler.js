const nodeWifi = require("node-wifi-2.0");
const speedTest = require("fast-speedtest-api");
const FastSpeedtest = require("fast-speedtest-api");
const nodeNotifier = require("node-notifier");

function getNetwork(){
    return new Promise((resolve, reject) => {
        nodeWifi.getCurrentConnections((err, network) => {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(network);
            }
        });
    })
}

function getNetworks()
{
    return new Promise((resolve, reject) => {
        nodeWifi.scan((err, network) => {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(network);
            }
        });
    })
}

function initNetwork()
{
    nodeWifi.init({
        iface: null
    });
}

function connectNetwork(_ssid, _password)
{
    nodeWifi.connect({ ssid: _ssid , password: _password }, () => {
        nodeNotifier.notify({
            title : "Connected",
            message : `Connected to ${_ssid}`,
            sound : true,
        }, (err, res, meta) => {}); 
    });
}

async function getCurrentNetworkTechnology()
{
}

module.exports = {
    getNetwork: getNetwork,
    getNetworks: getNetworks,
    initNetwork: initNetwork,
    connectNetwork: connectNetwork,
    getCurrentNetworkTechnology : getCurrentNetworkTechnology,
};