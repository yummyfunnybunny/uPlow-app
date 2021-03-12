export const carouselController = () => {
  // ANCHOR -- Event Listeners --
  const carousel = document.querySelector(".hero-carousel");
  const slider = document.querySelector(".slider");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const slideIndicators = document.querySelectorAll(".controls ul li");

  // ANCHOR -- Initialize direction --
  let direction = -1;
  let sliderIndex = 0;
  const sliderLength = document.querySelectorAll(".slider section").length;

  // ANCHOR -- Event Listeners --
  prev.addEventListener("click", scrollLeft);
  next.addEventListener("click", scrollRight);
  slider.addEventListener("transitionend", transitionEnd);

  // ANCHOR -- Functions --
  function scrollLeft() {
    if (direction === -1) {
      slider.appendChild(slider.firstElementChild);
    }
    carousel.style.justifyContent = "flex-end";
    slider.style.transform = "translate(33.33%)";
    updateSliderIndex(-1);
    direction = 1;
  }

  function scrollRight() {
    if (direction === 1) {
      slider.prepend(slider.lastElementChild);
    }
    carousel.style.justifyContent = "flex-start";
    slider.style.transform = "translate(-33.33%)";
    updateSliderIndex(1);
    direction = -1;
  }

  function transitionEnd() {
    if (direction === -1) {
      slider.appendChild(slider.firstElementChild);
    } else if (direction === 1) {
      slider.prepend(slider.lastElementChild);
    }
    slider.style.transition = "none";
    slider.style.transform = "translate(0)";
    setTimeout(() => {
      slider.style.transition = "all 0.5s";
    });
  }

  const updateSliderIndex = (direction) => {
    // handle slider index changes
    sliderIndex += direction;
    if (sliderIndex < 0) {
      sliderIndex = sliderLength - 1;
    }
    if (sliderIndex > sliderLength - 1) {
      sliderIndex = 0;
    }
    // turn 'selected' off for all indicators
    slideIndicators.forEach((e) => {
      e.classList.remove("selected");
    });
    // now selected on for the current slider index
    slideIndicators[sliderIndex].classList.add("selected");
  };

  let intervalId;
  function startSlideShow() {
    intervalId = setInterval(function () {
      scrollRight();
    }, 5000);
  }
  startSlideShow();

  carousel.addEventListener("mouseover", () => {
    clearInterval(intervalId);
  });

  carousel.addEventListener("mouseout", startSlideShow);
};

// declare scrollTimer
// const scrollTimer = () => {
//   setInterval(() => {
//     scrollRight();
//   }, 5000);
// };

// const scrollTimer = setInterval(scrollRight, 5000);

// Call ScrollTimer
// scrollTimer();
