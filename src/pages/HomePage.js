import { initialPicturesGallery, updateGallery } from "../components/PicturesGallery.js";
import { initialPicturesListGallery, updateListGallery } from "../components/ListGallery.js";
import { initialPicturesCarousel, updateCarousel } from "../components/PicturesCarousel.js";
import { initialCartPicturesGallery, updateCartGallery } from "../components/CartPicturesGallery.js"
import { initPopup, initInfoPopup } from "../components/Popup.js";
import checkIfBusiness from "../utilities/checkIfBusiness.js";
import checkIfConnected from "../utilities/checkIfConnected.js";

let picturesArr, originalPicturesArr;
let galleryBtn;
let listGalleryBtn;
let carouselBtn;

let gallery;
let listGallery;
let carousel;
let displayNow;
let isBusiness;

window.addEventListener("load", () => {
    picturesArr = localStorage.getItem("pictures");
    if (!picturesArr) {
        return;
    }
    picturesArr = JSON.parse(picturesArr);
    originalPicturesArr = [...picturesArr];
    isBusiness = checkIfBusiness();
    initialPicturesGallery(picturesArr, isBusiness, deletePicture, showPopup, checkIfConnected, showInfoPopup);
    initialPicturesListGallery(picturesArr, isBusiness, deletePicture, showPopup, checkIfConnected, showInfoPopup);
    initialPicturesCarousel(picturesArr);
    initialCartPicturesGallery(isBusiness, deletePicture, showPopup, checkIfConnected, showInfoPopup);
    initializeElements();
    initializeBtns();
});

const initializeElements = () => {
    galleryBtn = document.getElementById("galleryBtn");
    listGalleryBtn = document.getElementById("listGalleryBtn");
    carouselBtn = document.getElementById("carouselBtn");
    gallery = document.getElementById("picturesGallery");
    listGallery = document.getElementById("picturesListGallery");
    carousel = document.getElementById("picturesCarousel");
    displayNow = gallery;
    display(displayNow);
};

const display = (toDisplay) => {
    displayNow.classList.remove("d-block");
    displayNow.classList.add("d-none");
    toDisplay.classList.add("d-block");
    toDisplay.classList.remove("d-none");
    displayNow = toDisplay;
};

const initializeBtns = () => {
    galleryBtn.addEventListener("click", () => {
        display(gallery);
    });

    listGalleryBtn.addEventListener("click", () => {
        display(listGallery);
    });

    carouselBtn.addEventListener("click", () => {
        display(carousel);
    });
    document.getElementById("homeDisplaySortASC").addEventListener("click", () => {
        sortProperties();
    });
    document.getElementById("homeDisplaySortDESC").addEventListener("click", () => {
        sortProperties(false);
    });
    document.getElementById("homeDisplaySearch").addEventListener("input", (ev) => {
        let regex = new RegExp("^" + ev.target.value, "i");
        picturesArr = JSON.parse(localStorage.getItem("pictures")).filter((item) => regex.test(item.title));
        updateDisplays();
    });
};

const deletePicture = (id) => {
    id = +id;
    originalPicturesArr = originalPicturesArr.filter(
        (item) => item.id !== id
    );
    saveToLocalStorage(originalPicturesArr);
    picturesArr = picturesArr.filter(
        (item) => item.id !== id
    );
    updateDisplays();
};

const updateDisplays = () => {
    updateGallery(picturesArr);
    updateListGallery(picturesArr);
    updateCartGallery();
    if (picturesArr.length === 0) {
        return;
    }
    updateCarousel(picturesArr);
};

const saveToLocalStorage = (arrToSave) => {
    localStorage.setItem("pictures", JSON.stringify(arrToSave));
};

const sortProperties = (asc = true) => {
    if (asc) {
        picturesArr.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        picturesArr.sort((a, b) => b.title.localeCompare(a.title));
    }
    updateDisplays();
};

const showPopup = (id) => {
    let selectedPicture = picturesArr.find((item) => item.id === (+id));
    if (!selectedPicture) {
        return;
    }
    initPopup(selectedPicture, editPicture);
};

const showInfoPopup = (id) => {
    let selectedPicture = picturesArr.find((item) => item.id === (+id));
    if (!selectedPicture) {
        return;
    }
    initInfoPopup(selectedPicture);
};

const showNewPopup = () => {
    initPopup(undefined, addNewPicture);
};

const addNewPicture = (newPicture) => {
    originalPicturesArr = [...originalPicturesArr, newPicture];
    let nextId = +newPicture.id + 1;
    localStorage.setItem("nextId", nextId + "");
    picturesArr = [...originalPicturesArr];
    editPicture();
};

const editPicture = () => {
    saveToLocalStorage(originalPicturesArr);
    updateDisplays();
};

export { showNewPopup };