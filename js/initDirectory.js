let spinner = {
  frames: ["◐", "◓", "◑", "◒"],
  interval: 80,
  currentFrame: 0,
};

function initDirectoryFilters() {
  const filters = document.querySelectorAll(".directory--filters button");
  let activeFilter = null;

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

function slugExists(slug) {
  const items = document.querySelectorAll(".directory--item");
  let exists = false;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (item.getAttribute("data-slug") === slug) {
      console.log("found");
      exists = true;
      break;
    }
  }

  return exists;
}

function getItemBySlug(slug) {
  const items = document.querySelectorAll(".directory--item");
  let result = null;
  items.forEach((item) => {
    if (item.getAttribute("data-slug") === slug) {
      result = item;
    }
  });
  return result;
}

function cycleSpinner() {}

function initDirectory() {
  const items = document.querySelectorAll(".directory--item");
  const container = document.querySelector(".directory--entry");
  const currentDirectoryItem = document.querySelector(
    ".current-directory-item"
  );
  let activeItem = null;

  function fetchProjectBySlug(slug) {
    console.log(`fetching ${slug}`);
    let item = getItemBySlug(slug);
    fetch(`/directory-items/${slug}/index.html`)
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
        window.location.hash = slug;
        activeItem = item;
        item.classList.add("active");
        currentDirectoryItem.innerHTML = item.getAttribute("data-title");

        let images = container.querySelectorAll("img");
        if (images.length > 0) {
          let loaded = 0;
          let spinnerEl = document.createElement("span");
          spinnerEl.classList.add("spinner");
          currentDirectoryItem.insertAdjacentElement("beforeend", spinnerEl);
          window.spinnerLoop = window.setInterval(function () {
            spinnerEl.innerText = spinner.frames[spinner.currentFrame];
            if (spinner.currentFrame < spinner.frames.length - 1) {
              spinner.currentFrame++;
            } else {
              spinner.currentFrame = 0;
            }
          }, spinner.interval);

          images.forEach((image) => {
            image.addEventListener("load", () => {
              loaded += 1;
              if (loaded === images.length) {
                window.setTimeout(function () {
                  window.clearInterval(window.spinnerLoop);
                  spinnerEl.remove();
                }, 1000);
              }
            });
          });
        }
      });
  }

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      // When the directory item is clicked,
      // we're going to fetch the project's compiled HTML
      // and dump it into the DOM
      const slug = item.getAttribute("data-slug");
      if (activeItem) {
        activeItem.classList.remove("active");
      }
      fetchProjectBySlug(slug);
    });
  });

  // This fires on load
  if (window.location.hash) {
    const slug = window.location.hash.replace("#", "");
    if (slugExists(slug)) {
      console.log("slug was found, fetching...");
      fetchProjectBySlug(slug);
    }
  }
}

export default initDirectory;
