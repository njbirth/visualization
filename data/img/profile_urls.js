// ==UserScript==
// @name         MP Images
// @namespace    http://tampermonkey.net
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bundestag.de/abgeordnete
// @icon         https://www.google.com/s2/favicons?domain=bundestag.de
// @grant        none
// ==/UserScript==

window.getMPNames = function() {
    let a = document.querySelectorAll("ul.bt-list-holder li a.bt-open-in-overlay");
    let data = [];
    a.forEach(elem => {
        let json = {}
        json.name = elem.title;
        json.url = elem.href;
        data.push(json);
    });
    console.log(data);
}