function initHome(el) {
  let shouldAppend = true;
  let currentIndex = 0;
  const container = document.querySelector(".preview-items");

  function addToEnd() {
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
        addToEnd();
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
