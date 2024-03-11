const generalButton = document.getElementById("general-button");
const networkButton = document.getElementById("network-button");
const ruleButton = document.getElementById("rule-button");
const aboutButton = document.getElementById("about-button");
const debugButton = document.getElementById("debug-button");

function handleLayoutButton()
{
    aboutButton.addEventListener("click", () => {
        window.donut.loadPage("pages/about/about.html");
    });

    generalButton.addEventListener("click", () => {
        window.donut.loadPage("pages/general/general.html");
    });

    networkButton.addEventListener("click", () => {
        window.donut.loadPage("pages/network/network.html");
    });

    debugButton.addEventListener("click", () => {
        window.donut.loadPage("pages/debug/debug.html");
    });

    ruleButton.addEventListener("click", () => {
        window.donut.loadPage("pages/rules/rule.html");
    });










    
}

handleLayoutButton();