const nodeWifi = require("node-wifi-2.0");
const speedTest = require("fast-speedtest-api");
const FastSpeedtest = require("fast-speedtest-api");

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

function initNetwork()
{
    nodeWifi.init({
        iface: null
    });
}

async function getCurrentNetworkTechnology()
{
    try {
        let currentNetworkStats = await getNetwork();
        
        var channel = currentNetworkStats[0].channel;
        var freq = currentNetworkStats[0].frequency;
        var netSpeed = 0;

        if(channel >= 36 && freq >= 5000)
        {
            let speedtest = new FastSpeedtest({
                token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", 
                verbose: false, 
                timeout: 10000,
                https: true, 
                urlCount: 5, 
                bufferSize: 8, 
                unit: FastSpeedtest.UNITS.Mbps 
            });

            speedtest.getSpeed().then(speed => {
                console.log(speed);
                netSpeed = speed;

                if(netSpeed > 80)
                {
                    console.log(currentNetworkStats[0].ssid + "is 5g");
                }
                else
                {
                    console.log(currentNetworkStats[0].ssid + "is 4g or 4g lte");
                }
            });
        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getNetwork: getNetwork,
    initNetwork: initNetwork,
    getCurrentNetworkTechnology : getCurrentNetworkTechnology,
};