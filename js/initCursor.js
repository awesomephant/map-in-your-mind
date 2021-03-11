function initCursor(el) {
  window.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--mouse-x", e.clientX + "px");
    document.body.style.setProperty("--mouse-y", e.clientY + "px");
  });

  const elements = document.querySelectorAll("[data-cursor]");
  elements.forEach((el) => {
    el.addEventListener("mouseover", () => {
      document.body.classList.add("has-cursor");
      document.body.classList.add(`cursor-${el.getAttribute("data-cursor")}`);
    });
    el.addEventListener("mouseout", () => {
      document.body.classList.remove("has-cursor");
    });
  });
}

export default initCursor;
