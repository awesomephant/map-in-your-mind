import { gri } from "./utils.js";

const alternates = require("./letters.json");

function initHover(el) {
  const letters = el.innerText.split("");
  el.innerText = "";

  letters.forEach((l) => {
    let span = document.createElement("span");
    span.innerText = l;
    span.addEventListener("mouseout", (e) => {
      span.innerText = l;
    });
    span.addEventListener("mouseover", (e) => {
      let newLetter = "";
      // We're going to loop through each letter
      // and pick an alternate for each one.
      if (alternates[l]) {
        let alts = alternates[l].split("");
        let alt = alts[gri(0, alts.length - 1)];
        newLetter = alt;
      } else {
        newLetter = l;
      }
      span.innerText = newLetter;
    });

    el.appendChild(span);
  });
}

export default initHover;
