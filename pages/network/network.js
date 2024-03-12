let networksInfo = window.donut.getNetworksInfo();
const networkInfoBlock = document.getElementById("networkscan-view-info");
const selectBlock = document.getElementById("networks-select");
const connectButton = document.getElementById("connect-button");
const passwordFeild = document.getElementById("password");

let password = "";
let network_ssid = "";

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
        let optionBlock = document.createElement("option");
        optionBlock.value = data[i]["ssid"];
        optionBlock.innerHTML = data[i]["ssid"];
        networkInfoBlock.appendChild((createInfoBlock(data[i]["ssid"], data[i]["quality"], data[i]["frequency"])));
        selectBlock.appendChild(optionBlock);
    }
})

selectBlock.addEventListener("change", (event) => {
    network_ssid = event.target.value;
})

connectButton.addEventListener("click", () => {
    let creadArr = [];

    var cred = {
        "ssid": network_ssid,
        "pass": password,
    }

    password = passwordFeild.value;

    window.donut.loadFromFile("./password.json");

    window.donut.getFileData((data) => {

        creadArr = data;

        for(let i = 0; i < data.length; i++)
        {
            if(data[i]["ssid"] == network_ssid)
            {
                password = data[i]["password"];
            }
        }
    })


    if(password != "" && network_ssid != "")
    {
        window.donut.networkConnect(network_ssid, password);

        creadArr.push(cred);
        window.donut.writeToFile("./password.json", cred);

    }
    else{
        console.log("lajsdf");
    }
})