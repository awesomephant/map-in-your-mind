let spinner = {
  frames: ["◐", "◓", "◑", "◒"],
  interval: 80,
  currentFrame: 0,
};
let activeItem = null;

function initDirectoryFilters() {
  const items = document.querySelectorAll(".directory--item");
  const header = document.querySelector(".timeline .subtitle h2");
  const originalTitle = header.innerText;
  const filters = document.querySelectorAll(".directory--filters button");
  let currentFilter = [];

  filters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      filter.classList.toggle("active");
      let letter = filter.getAttribute("data-letter").toLowerCase();

      if (currentFilter.includes(letter)) {
        let index = currentFilter.indexOf(letter);
        currentFilter.splice(index, 1);
      } else {
        currentFilter.push(letter);
      }
      header.innerText = currentFilter.join(",").toUpperCase();
      if (currentFilter.length === 0) {
        header.innerText = originalTitle;
      }

      items.forEach((item) => {
        if (currentFilter.length > 0) {
          item.classList.remove("hidden");
          if (currentFilter.includes(item.innerText.toLowerCase()[0])) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        } else {
          item.classList.remove("hidden");
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

function initDirectory() {
  const container = document.querySelector(".directory--entry--inner");
  const currentDirectoryItem = document.querySelector(
    ".current-directory-item"
  );

  function initHashLinks(container) {
    const links = container.querySelectorAll("a[href^='#']");
    links.forEach((l) => {
      l.addEventListener("click", (e) => {
        //e.preventDefault();
        const slug = l.getAttribute("href").replace("#", "");
        if (activeItem) {
          activeItem.classList.remove("active");
        }
        fetchProjectBySlug(slug);
      });
    });
  }

  function fetchProjectBySlug(slug) {
    console.log(`fetching ${slug}`);
    const item = getItemBySlug(slug);
    const nav = document.querySelector(".directory--nav") 
    container.classList.add("loading");
    fetch(`/directory-items/${slug}/index.html`)
    .then((response) => response.text())
    .then((data) => {
        container.classList.remove("loading");
        container.innerHTML = data;
        //window.location.hash = slug;
        activeItem = item;
        item.classList.add("active");
        console.log(item)
        nav.scrollTo(0, item.offsetTop - 65)
        currentDirectoryItem.innerHTML = item.getAttribute("data-title");
        currentDirectoryItem.classList.add("active");
        let images = container.querySelectorAll("img");
        if (images.length > 0) {
          let loaded = 0;
          let spinnerEl = document.createElement("span");
          spinnerEl.classList.add("spinner");
          currentDirectoryItem.insertAdjacentElement("beforeend", spinnerEl);
          window.clearInterval(window.spinnerLoop);
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
          initHashLinks(container)
        }
      });
  }
  initHashLinks(document.querySelector(".directory--nav"));
  initDirectoryFilters();
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
