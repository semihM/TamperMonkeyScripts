// ==UserScript==
// @name         SongCompetitionSaver
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Automatically save song, artist and link from song competetion
// @author       semihM (aka rhinoooo_)
// @source       https://github.com/semihM/TamperMonkeyScripts/blob/main/SongCompetitionSaver
// @updateURL    https://github.com/semihM/TamperMonkeyScripts/blob/main/SongCompetitionSaver/userscript.js
// @supportURL   https://github.com/semihM/TamperMonkeyScripts/issues
// @include      /^(https?)?(\:)?(\/\/)?([^\/]*\.)?song\-competition\.live/game/.*
// @grant        GM_addStyle
// ==/UserScript==

document.saveSongsToFile = async function(){
    let anchor = document.getElementById("save_anchor");
    anchor.href = "data:text/plain;charset=UTF-8," + await document.getSongTexts();
    console.log(anchor);
    anchor.click();
}

document.getSongTexts = async function() {
    let rows;
    let container = document.getElementsByClassName("v-data-table__wrapper")[0];
    if (container == null)
    {
        let viewButton = document.getElementsByClassName("mb-2 mr-2 v-btn v-btn--icon v-btn--round theme--dark v-size--default")[0];
        viewButton.click();
        await new Promise(resolve => setTimeout(resolve, 250));
        container = document.getElementsByClassName("v-data-table__wrapper")[0];
        rows = container.children[0].children[2].children;
        viewButton.click();
    }
    else rows = container.children[0].children[2].children;

    let save = "";

    for(let t of rows) {
        save += t.children[1].textContent + " (" + t.children[5].children[0].children[1].href + ")\n";
    }
    return save;
}

document.buttonAdder = function() {
    let title = document.getElementsByClassName("v-card__title")[0];
    if (title == null) setTimeout(document.buttonAdder,1000);
    else document.getElementsByClassName("v-card__title")[0].innerHTML += `<br><button style="color:purple;border: 2px solid purple;padding:3px" id="save_songs_button" onclick="document.saveSongsToFile()">Save Current Song Links</button><a style="display:none" id="save_anchor" href="data:text/plain;charset=utf-8" download="songs.txt"></a>`
}
setTimeout(document.buttonAdder, 2000);
