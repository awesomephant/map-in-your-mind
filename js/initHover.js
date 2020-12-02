import { gri } from "./utils.js";

const alternates = require("./letters.json");

function initHover(el) {
  const text = el.innerText;

  el.addEventListener("mouseout", (e) => {
    el.innerText = text;
  });

  el.addEventListener("mouseover", (e) => {
    const letters = text.split("");
    let newText = "";
    // We're going to loop through each letter
    // and pick an alternate for each one.

    letters.forEach((l) => {
      if (alternates[l]) {
        let alts = alternates[l].split("");
        let alt = alts[gri(0, alts.length - 1)];
        newText += alt;
      } else {
        newText += l;
      }
    });
    el.innerText = newText;
  });
}

export default initHover;
