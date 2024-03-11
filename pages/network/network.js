let networksInfo = window.donut.getNetworksInfo();
const networkInfoBlock = document.getElementById("networkscan-view-info");

function createInfoBlock(ssid, strength, freq)
{
    let infoBlock = document.createElement("div");
    infoBlock.id = "network-info-block";

    let ssidh3 = document.createElement("h3");
    ssidh3.innerHTML = "🌐 " + ssid;

    let stre = document.createElement("h3");
    stre.innerHTML = "💪 " + strength;

    let fre = document.createElement("h3");
    fre.innerHTML = "📡 " + (freq / 1000) + " Ghz";

    infoBlock.appendChild(ssidh3);
    infoBlock.appendChild(stre);
    infoBlock.appendChild(fre);

    return infoBlock;
}

window.donut.reveiveNetsInfo((data) => {
    console.log(data);
    
    for(let i = 0; i < data.length; i++)
    {
        networkInfoBlock.appendChild((createInfoBlock(data[i]["ssid"], data[i]["quality"], data[i]["frequency"])));
    }
})