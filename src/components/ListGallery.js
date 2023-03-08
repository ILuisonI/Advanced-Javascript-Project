import { updateCartGallery } from "./CartPicturesGallery.js";
import showToast from "../services/Toast.js"

let picturesArr;
let galleryListDiv;
let isBusiness;
let deletePicture;
let showPopup;
let showInfoPopup;
let isConnected;
let users;

const initialPicturesListGallery = (picturesArrFromHomePage, isBusinessParam, deletePictureFromHomePage, showPopupFromHomePage, checkIfConnected, showInfoPopupFromHomePage) => {
    galleryListDiv = document.getElementById("home-page-pictures-list-gallery");
    isBusiness = isBusinessParam;
    deletePicture = deletePictureFromHomePage;
    showPopup = showPopupFromHomePage;
    showInfoPopup = showInfoPopupFromHomePage;
    isConnected = checkIfConnected();
    updateListGallery(picturesArrFromHomePage);
};

const updateListGallery = (picturesArrFromHomePage) => {
    picturesArr = picturesArrFromHomePage;
    createPropertiesList();
};

const createItem = (id, number, credit, title, img) => {
    const businessBtns = `<td><button type="button" class="btn" id="pictureListEditBtn-${id}"><i class="bi bi-pencil-square"></i></button></td>
                        <td><button type="button" class="btn" id="pictureListDeleteBtn-${id}"><i class="bi bi-trash"></i></button></td>`;
    const connectedBtns = `<td><button type="button" class="btn" id="pictureListAddToCartBtn-${id}"><i class="bi bi-cart-plus"></i></button></td>`;
    return `
    <tr>
        <th scope="row">${number}</th>
        <td><img src="${img}" class="img-fluid" alt="${title}" id="pictureListInfo-${id}" style="cursor: pointer;" /></td>
        <td>${img}</td>
        <td>${title}</td>
        <td>${credit}</td>
        ${isConnected ? connectedBtns : ""}
        ${isBusiness ? businessBtns : ""}`
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
const createPropertiesList = () => {
    clearEventListener("pictureListDeleteBtn", handleDeleteBtnClick);
    clearEventListener("pictureListEditBtn", handleEditBtnClick);
    clearEventListener("pictureListInfo", handleImgClick);
    clearEventListener("pictureListAddToCartBtn", handleAddToCart);
    let innerHTML = "";
    innerHTML += `<table class="table">
        <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">Image</th>
                <th scope="col">Image URL</th>
                <th scope="col">Title</th>
                <th scope="col">Credit</th>
                <th scope="col">Add To Cart</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>`;
    let number = 1;
    for (let picture of picturesArr) {
        innerHTML += createItem(
            picture.id,
            number++,
            picture.credit,
            picture.title,
            picture.imgURL);
    }
    innerHTML += `</tbody>
        </table>`;
    galleryListDiv.innerHTML = innerHTML;
    createEventListener("pictureListDeleteBtn", handleDeleteBtnClick);
    createEventListener("pictureListEditBtn", handleEditBtnClick);
    createEventListener("pictureListInfo", handleImgClick);
    createEventListener("pictureListAddToCartBtn", handleAddToCart);
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

export { initialPicturesListGallery, updateListGallery };