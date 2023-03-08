import { updateCartGallery } from "./CartPicturesGallery.js";
import showToast from "../services/Toast.js"

let picturesArr;
let galleryDiv;
let isBusiness;
let deletePicture;
let showPopup;
let showInfoPopup;
let isConnected;
let users;

const initialPicturesGallery = (picturesArrFromHomePage, isBusinessParam, deletePictureFromHomePage, showPopupFromHomePage, checkIfConnected, showInfoPopupFromHomePage) => {
    galleryDiv = document.getElementById("home-page-pictures-gallery");
    isBusiness = isBusinessParam;
    deletePicture = deletePictureFromHomePage;
    showPopup = showPopupFromHomePage;
    showInfoPopup = showInfoPopupFromHomePage;
    isConnected = checkIfConnected();
    updateGallery(picturesArrFromHomePage);
};

const updateGallery = (picturesArrFromHomePage) => {
    picturesArr = picturesArrFromHomePage;
    createPicturesGallery();
};

const createCard = (id, name, credit, price, img) => {
    const businessBtns = `<button type="button" class="btn btn-warning" id="pictureEditBtn-${id}"><i class="bi bi-pencil-square"></i></button>
                        <button type="button" class="btn btn-danger" id="pictureDeleteBtn-${id}"><i class="bi bi-trash"></i></button>`;
    const addToCartBtn = `<button type="button" class="btn btn-success" id="pictureAddToCartBtn-${id}"><i class="bi bi-cart-plus"></i></button>`;
    return `<div div class="col" >
                <div class="card">
                    <img src="${img}" class="card-img-top" alt="${name}" id="pictureInfo-${id}" style="cursor: pointer;" />
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">
                            Credit: <b>${credit}</b>
                        </p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Price: <b>${price}</b>$</li>
                    </ul>
                    
                        ${isConnected ? '<div class="card-body text-center">' + addToCartBtn : ""}
                        ${isBusiness ? businessBtns : ""}
                        ${isConnected ? '</div >' : ""}
                </div>
            </div>`;
};

const clearEventListener = (idKeyword, functionHandle) => {
    let items = document.querySelectorAll(`[id^='${idKeyword}']`);
    for (let item of items) {
        item.removeEventListener("click", functionHandle);
    }
};

const createEventListener = (idKeyword, functionHandle) => {
    let items = document.querySelectorAll(`[id^='${idKeyword}']`);
    for (let item of items) {
        item.addEventListener("click", functionHandle);
    }
};

//Creates the HTML of properties gallery
const createPicturesGallery = () => {
    clearEventListener("pictureDeleteBtn", handleDeleteBtnClick);
    clearEventListener("pictureEditBtn", handleEditBtnClick);
    clearEventListener("pictureInfo", handleImgClick);
    clearEventListener("pictureAddToCartBtn", handleAddToCart);
    let innerHTML = "";
    for (let picture of picturesArr) {
        innerHTML += createCard(
            picture.id,
            picture.title,
            picture.credit,
            picture.price,
            picture.imgURL);
    }
    galleryDiv.innerHTML = innerHTML;
    createEventListener("pictureDeleteBtn", handleDeleteBtnClick);
    createEventListener("pictureEditBtn", handleEditBtnClick);
    createEventListener("pictureInfo", handleImgClick);
    createEventListener("pictureAddToCartBtn", handleAddToCart);
};

//Deletes picture when clicking on delete button
const handleDeleteBtnClick = (ev) => {
    deletePicture(getIdFromClick(ev));
};

const handleEditBtnClick = (ev) => {
    showPopup(getIdFromClick(ev));
};

const handleImgClick = (ev) => {
    showInfoPopup(getIdFromClick(ev));
};

const handleAddToCart = (ev) => {
    addToCart(getIdFromClick(ev));
};

const addToCart = (id) => {
    id = +id;
    let user = getUserInfo();
    if (!user) {
        return;
    }
    user.cart = [...user.cart, id];
    localStorage.setItem("users", JSON.stringify(users));
    showToast("Picture Added To Cart");
    updateCartGallery();
};

const getUserInfo = () => {
    users = localStorage.getItem("users");
    let token = localStorage.getItem("token");
    if (!token) {
        return;
    }
    users = JSON.parse(users);
    token = JSON.parse(token);
    return users.find((item) => item.id === token.id);
};

const getIdFromClick = (ev) => {
    let idFromId = ev.target.id.split("-");

    //If pressed on the icon
    if (!ev.target.id) {
        idFromId = ev.target.parentElement.id.split("-");
    }
    return +idFromId[1];
};

export { initialPicturesGallery, updateGallery };