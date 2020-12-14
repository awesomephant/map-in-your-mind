import initHover from "./initHover";
import initSlider from "./initSlider";
import initDirectory from "./initDirectory";
import initHome from "./initHome";
import initCursor from "./initCursor";
import { gri } from "./utils";

function initHovers() {
  const links = document.querySelectorAll(".site-header a");
  links.forEach((l) => {
    initHover(l);
  });
}

function initSliders() {
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider) => {
    initSlider(slider);
  });
}

function setFavicon() {
  // <link rel="shortcut icon" href='{{"" | url }}'>
  const icons = ["favicon-1.ico", "favicon-2.ico", "favicon-3.ico"];
  let linkEl = document.createElement("link");
  linkEl.setAttribute("rel", "shortcut icon");
  linkEl.setAttribute(
    "href",
    `/assets/favicons/${icons[gri(0, icons.length - 1)]}`
  );
  document.head.appendChild(linkEl);
}

window.addEventListener("DOMContentLoaded", () => {
  if (navigator.appVersion.indexOf("Win") !== -1) {
    // UA-Sniffing to adjust for font rendering
    document.body.classList.add("is-windows");
  }
  initSliders();
  initHovers();
  initHome();
  initCursor();
  setFavicon();
  if (document.body.classList.contains("directory")) {
    initDirectory();
  }
});
