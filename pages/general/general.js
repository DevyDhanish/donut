const blockToAddInto = document.getElementById("general-block-add-data");
let networkInfo = window.donut.getNetworkInfo();

"WrestleMania "

window.donut.reveiveNetInfo((data) => {
    console.log(data);
    // create names
    let bssid = document.createElement("h3");
    bssid.innerHTML = "bssid : " + data[0]["bssid"];

    let iname = document.createElement("h3");
    iname.innerHTML = "iface : " + data[0]["iface"];

    let channel = document.createElement("h3");
    channel.innerHTML = "channel : " + data[0]["channel"];

    let freq = document.createElement("h3");
    freq.innerHTML = "frequency : " + (data[0]["frequency"] / 1000) + " Ghz";

    let mac = document.createElement("h3");
    mac.innerHTML = "mac : " + data[0]["mac"];

    let ssid = document.createElement("h3");
    ssid.innerHTML = "ssid : " + data[0]["ssid"];

    let security = document.createElement("h3");
    security.innerHTML = "security : " + data[0]["security"];

    let signalStrength = document.createElement("h3");
    signalStrength.innerHTML = "signal strength : " + data[0]["signal_level"];

    blockToAddInto.appendChild(bssid);
    blockToAddInto.appendChild(iname);
    blockToAddInto.appendChild(channel);
    blockToAddInto.appendChild(freq);
    blockToAddInto.appendChild(freq);
    blockToAddInto.appendChild(ssid);
    blockToAddInto.appendChild(security);
    blockToAddInto.append(signalStrength);
});