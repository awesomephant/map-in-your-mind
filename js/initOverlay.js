import { gri } from "./utils.js";

function initOverlay() {
  const count = 12;
  for (let i = 1; i < count; i++){
    //let filename = `/assets/glyph-overlays/glyph-overlay-${gri(1, 18)}.png`;
    let filename = `/assets/glyph-overlays/glyph-overlay-${i}.png`;
    const angles = [-180, -90, -45, 0, 45, 90, 180] 

    let container = document.createElement("div")
    container.classList.add("overlay-image-container")
    container.style.left = `${gri(-0, 90)}%`
    container.style.top = `${gri(-0, 90)}%`
    container.style.transform = `${angles[gri(0, angles.length)]}deg`
    
    let img = document.createElement("img")
    img.classList.add("overlay-image")
    img.setAttribute("src", filename)
    container.appendChild(img)

    document.body.appendChild(container)
  }
}

export default initOverlay;
