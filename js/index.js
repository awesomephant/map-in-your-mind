import initHover from "./initHover";
import initSlider from "./initSlider";
import initDirectory from "./initDirectory";
import initHome from "./initHome";
import initCursor from "./initCursor";
import initOverlay from "./initOverlay";
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
  const icons = ["favicon-1.ico", "favicon-2.ico", "favicon-3.ico", "favicon-4.png", "favicon-5.png", "favicon-6.png", "favicon-7.png", "favicon-8.png", "favicon-9.png", "favicon-10.png", "favicon-11.png", "favicon-12.png", "favicon-13.png", "favicon-14.png"];
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
//  initCursor();
  setFavicon();
  initOverlay();
  if (document.body.classList.contains("directory")) {
    initDirectory();
  }
});
