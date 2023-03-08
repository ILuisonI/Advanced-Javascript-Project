let picturesArr;
let carouselDiv;
let caouselDivCredit;
let showIndx;
let imgToHide;
let imgToShow;
let imgCreditToShow;
let imgCreditToHide;
let animationStarted;

window.addEventListener("load", () => {
  setInterval(() => {
    if (animationStarted) {
      return;
    }
    animationStarted = true;
    let nextIndx = showIndx + 1;
    if (nextIndx >= picturesArr.length) {
      nextIndx = 0;
    }
    imgCreditToHide = document.querySelector(`.imgCredit > div:nth-child(${showIndx + 1})`);
    imgCreditToHide.classList.add("d-none");

    imgToHide = document.querySelector(`.img-container > img:nth-child(${showIndx + 1})`);
    imgToHide.classList.add("fade-out");
    imgToHide.addEventListener("animationend", hideImg, { once: true });

    imgCreditToShow = document.querySelector(`.imgCredit > div:nth-child(${nextIndx + 1})`);
    imgCreditToShow.classList.remove("d-none");

    imgToShow = document.querySelector(`.img-container > img:nth-child(${nextIndx + 1})`);
    imgToShow.classList.add("fade-in");
    imgToShow.classList.remove("opacity-0");
    imgToShow.addEventListener("animationend", showImg, { once: true });
    showIndx = nextIndx;
  }, 3000)
});

const initialPicturesCarousel = (picturesArrFromHomePage) => {
  carouselDiv = document.getElementById("home-page-pictures-carousel");
  caouselDivCredit = document.getElementById("imgCredit");
  initializeBtns();
  updateCarousel(picturesArrFromHomePage);
};

const updateCarousel = (picturesArrFromHomePage) => {
  showIndx = 0;
  animationStarted = false;
  picturesArr = picturesArrFromHomePage;
  createCarousel();
};

const initializeBtns = () => {
  document.getElementById("back-carousel-btn").addEventListener("click", () => {
    if (animationStarted) {
      return;
    }
    animationStarted = true;
    let prevIndx = showIndx - 1;
    if (prevIndx < 0) {
      prevIndx = picturesArr.length - 1;
    }
    imgCreditToHide = document.querySelector(`.imgCredit > div:nth-child(${showIndx + 1})`);
    imgCreditToHide.classList.add("d-none");

    imgToHide = document.querySelector(`.img-container > img:nth-child(${showIndx + 1})`);
    imgToHide.classList.add("fade-out");
    imgToHide.addEventListener("animationend", hideImg, { once: true });

    imgCreditToShow = document.querySelector(`.imgCredit > div:nth-child(${prevIndx + 1})`);
    imgCreditToShow.classList.remove("d-none");

    imgToShow = document.querySelector(`.img-container > img:nth-child(${prevIndx + 1})`);
    imgToShow.classList.add("fade-in");
    imgToShow.classList.remove("opacity-0");
    imgToShow.addEventListener("animationend", showImg, { once: true });
    showIndx = prevIndx;
  });

  document.getElementById("next-carousel-btn").addEventListener("click", () => {
    if (animationStarted) {
      return;
    }
    animationStarted = true;
    let nextIndx = showIndx + 1;
    if (nextIndx >= picturesArr.length) {
      nextIndx = 0;
    }
    imgCreditToHide = document.querySelector(`.imgCredit > div:nth-child(${showIndx + 1})`);
    imgCreditToHide.classList.add("d-none");

    imgToHide = document.querySelector(`.img-container > img:nth-child(${showIndx + 1})`);
    imgToHide.classList.add("fade-out");
    imgToHide.addEventListener("animationend", hideImg, { once: true });

    imgCreditToShow = document.querySelector(`.imgCredit > div:nth-child(${nextIndx + 1})`);
    imgCreditToShow.classList.remove("d-none");

    imgToShow = document.querySelector(`.img-container > img:nth-child(${nextIndx + 1})`);
    imgToShow.classList.add("fade-in");
    imgToShow.classList.remove("opacity-0");
    imgToShow.addEventListener("animationend", showImg, { once: true });
    showIndx = nextIndx;
  });
};

const createItem = (name, img) => {
  return `
  <img src="${img}" alt="${name}" class="opacity-0" />`;
};

const createItemCredit = (credit) => {
  return `
  <div class="container d-none">Photographed By: ${credit}</div>`;
};

const createCarousel = () => {
  let innerHTML = "";
  let innerHTMLCredit = "";
  for (let picture of picturesArr) {
    innerHTML += createItem(picture.title, picture.imgURL, picture.credit);
    innerHTMLCredit += createItemCredit(picture.credit);
  }
  carouselDiv.innerHTML = innerHTML;
  caouselDivCredit.innerHTML = innerHTMLCredit;
  document.querySelector(`.imgCredit > div:nth-child(${showIndx + 1})`).classList.remove("d-none");
  document.querySelector(`.img-container > img:nth-child(${showIndx + 1})`).classList.remove("opacity-0");
  document.getElementById("imgCredit").classList.remove("d-none");
};

const showImg = () => {
  imgToShow.classList.remove("opacity-0");
  imgToShow.classList.remove("fade-in");
  animationStarted = false;
};

const hideImg = () => {
  imgToHide.classList.add("opacity-0");
  imgToHide.classList.remove("fade-out");
  animationStarted = false;
};

export { initialPicturesCarousel, updateCarousel };
