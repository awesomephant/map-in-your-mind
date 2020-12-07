function initDirectory() {
  const items = document.querySelectorAll(".directory--item");
  const filters = document.querySelectorAll(".directory--filters button");
  const container = document.querySelector(".directory--entry");
  let activeItem = null;
  let activeFilter = null;

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      // When the directory item is clicked,
      // we're going to fetch() the project's compiled HTML
      // and dump it into the DOM
      const slug = item.getAttribute("data-slug");
      if (activeItem) {
        activeItem.classList.remove("active");
      }
      item.classList.add("active");
      activeItem = item;

      fetch(`/directory-items/${slug}/index.html`)
        .then((response) => response.text())
        .then((data) => {
          container.innerHTML = data;
        });
    });
  });

  filters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      if (activeFilter) {
        activeFilter.classList.remove("active");
      }
      filter.classList.add("active");
      activeFilter = filter;

      let letter = filter.getAttribute("data-letter").toLowerCase();
      items.forEach((item) => {
        if (letter === "all") {
          item.classList.remove("hidden");
        } else {
          item.classList.remove("hidden");
          if (item.innerText.toLowerCase()[0] === letter) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        }
      });
    });
  });
}

export default initDirectory;
