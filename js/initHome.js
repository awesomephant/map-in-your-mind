import initSlider from "./initSlider";

function initHome(el) {
  let shouldAppend = true;
  let currentIndex = 0;
  const container = document.querySelector(".preview-items");
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider) => {
    initSlider(slider);
  });

  function addToEnd() {
    let homeItems = document.querySelectorAll(".preview-item");
    let first = homeItems[currentIndex].cloneNode(true);
    container.insertAdjacentElement("beforeend", first);
    let slider = first.querySelector(".slider");
    initSlider(slider);
    shouldAppend = false;
    currentIndex += 1;
    window.setTimeout(function () {
      shouldAppend = true;
    }, 200);
  }
  function addToTop() {
    let homeItems = document.querySelectorAll(".preview-item");
    let first = homeItems[currentIndex].cloneNode(true);
    container.insertAdjacentElement("beforeend", first);
    shouldAppend = false;
    currentIndex += 1;
    window.setTimeout(function () {
      shouldAppend = true;
    }, 200);
  }

  window.addEventListener("scroll", (e) => {
    let box = document.documentElement.getBoundingClientRect();
    let relativeBottom = box.bottom;
    let relativeTop = box.top;
    if (relativeTop > 500) {
      if (shouldAppend) {
        //addToTop();
      }
    }
    if (relativeBottom < document.documentElement.clientHeight + 500) {
      if (shouldAppend) {
        addToEnd();
      }
    }
  });
}

export default initHome;
