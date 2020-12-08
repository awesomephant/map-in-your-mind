import initHover from "./initHover";
import initSlider from "./initSlider";
import initDirectory from "./initDirectory";
import initHome from "./initHome";
import initCursor from "./initCursor";

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

window.addEventListener("DOMContentLoaded", () => {
  if (navigator.appVersion.indexOf("Win") !== -1) {
    // UA-Sniffing to adjust for font rendering
    document.body.classList.add("is-windows");
  }
  initSliders();
  initHovers();
  initDirectory();
  initHome();
  initCursor();
});
