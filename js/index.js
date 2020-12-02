import initHover from "./initHover";
import initSlider from "./initSlider";
function initHovers() {
  const links = document.querySelectorAll("a");
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
});
