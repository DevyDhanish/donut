const general_button = document.getElementById("general-button");
const network_button = document.getElementById("network-button");
const rule_button = document.getElementById("rule-button");
const about_button = document.getElementById("about-button");
const debug_button = document.getElementById("debug-button");

function handleLayoutButton()
{
    about_button.addEventListener("click", () => {
        window.donut.loadPage("pages/about/about.html");
    });

    general_button.addEventListener("click", () => {
        window.donut.loadPage("pages/general/general.html");
    });

    network_button.addEventListener("click", () => {
        window.donut.loadPage("pages/network/network.html");
    });

    debug_button.addEventListener("click", () => {
        window.donut.loadPage("pages/debug/debug.html");
    });

    rule_button.addEventListener("click", () => {
        window.donut.loadPage("pages/rules/rule.html");
    });
}

handleLayoutButton();