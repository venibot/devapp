const package = require("./package.json");

const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
};

window.addEventListener("DOMContentLoaded", () => {
    replaceText("app-version", " " + package.version);
    replaceText("node-version", process.versions["node"]);
    replaceText("chrome-version", process.versions["chrome"]);
    replaceText("electron-version", process.versions["electron"]);
});