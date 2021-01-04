import { gri } from "./utils.js";

let overlayCounter = 0;
let overlayMax = 12;

function clearOverlay() {
  const outer = document.querySelector(".site-overlays");
  document.body.classList.remove("overlay-active");
  window.idleSeconds = 0;
  window.setTimeout(function () {
    outer.innerHTML = "";
  }, 1000);
}
function addOverlayGlyph() {
  const outer = document.querySelector(".site-overlays");
  let filename = overlays[gri(0, overlays.length - 1)];
  const angles = [-180, -90, -45, 0, 45, 90, 180];
  let container = document.createElement("div");
  container.classList.add("overlay-image-container");
  container.style.left = `${gri(-10, 90)}%`;
  container.style.top = `${gri(-10, 90)}%`;
  container.style.transform = `scale(.1) rotate(${angles[gri(0, angles.length - 1)]}deg)`;

  let img = document.createElement("img");
  img.classList.add("overlay-image");
  img.setAttribute("src", filename);
  container.appendChild(img);
  outer.appendChild(container);
}

function initOverlay() {
  window.idleSeconds = 0;
  const idleCounter = window.setInterval(function () {
    window.idleSeconds++;
    if (window.idleSeconds > 10) {
      overlayCounter++;
      if (overlayCounter < overlayMax) {
        addOverlayGlyph();
      }
    }
  }, 1000);

  document.body.classList.add("overlay-active");
  window.addEventListener("scroll", () => {
    clearOverlay();
  });
  window.addEventListener("mousemove", () => {
    clearOverlay();
  });
  window.addEventListener("touchstart", () => {
    clearOverlay();
  });
}

export default initOverlay;
