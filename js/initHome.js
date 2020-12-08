function initHome(el) {
  const homeItems = document.querySelectorAll(".preview-item");

  function handleIntersection(entries, observer) {
    console.log(entries);
  }
  let observer = new IntersectionObserver(handleIntersection, {
    threshold: [0.3],
  });

  homeItems.forEach((item) => {
//    observer.observe(item);
  });
}

export default initHome;
