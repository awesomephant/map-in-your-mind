function initSlider(slider) {
  let s = slider.querySelector(".slider--slides");
  const sliderRect = s.getBoundingClientRect();
  const statusLine = slider.querySelector(".slider-count");
  const slides = s.querySelectorAll(".slide");
  s.currentSlide = 0;

  function setSlide(n) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
    });
    slides[n].classList.add("active");
  }

  function xScaledToSlide(xScaled) {
    let slide = Math.floor(xScaled / (1 / slides.length));
    if (slide !== s.currentSlide && slide > -1 && slide < slides.length) {
      setSlide(slide);
      s.currentSlide = slide;
      statusLine.innerText = `${s.currentSlide + 1} / ${slides.length}`;
    }
  }

  s.addEventListener("mousemove", (e) => {
    let xScaled = (e.clientX - sliderRect.x) / sliderRect.width;
    xScaledToSlide(xScaled);
  });

  s.addEventListener("touchmove", (e) => {
    e.preventDefault();
    let xScaled = (e.touches[0].clientX - sliderRect.x) / sliderRect.width;
    xScaledToSlide(xScaled);
  });
  if (slider.getAttribute("data-current")) {
    let startSlides = JSON.parse(slider.getAttribute("data-current"));
    slider.currentSlide = startSlides[0];
    setSlide(slider.currentSlide);
    statusLine.innerText = `${slider.currentSlide * 1 + 1} / ${slides.length}`;
  } else {
    setSlide(0);
  }
}

export default initSlider;
