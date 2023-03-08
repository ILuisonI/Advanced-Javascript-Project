let picturesArr;
let galleryDiv;
let isBusiness;
let deletePicture;
let showPopup;
let showInfoPopup;
let isConnected;
let users;

const initialCartPicturesGallery = (isBusinessParam, deletePictureFromHomePage, showPopupFromHomePage, checkIfConnected, showInfoPopupFromHomePage) => {
    galleryDiv = document.getElementById("cart-pictures-gallery");
    isBusiness = isBusinessParam;
    deletePicture = deletePictureFromHomePage;
    showPopup = showPopupFromHomePage;
    showInfoPopup = showInfoPopupFromHomePage;
    isConnected = checkIfConnected();
    updateCartGallery();
};

const updateCartGallery = () => {
    picturesArr = localStorage.getItem("pictures");
    if (!picturesArr) {
        return;
    }
    picturesArr = JSON.parse(picturesArr);
    createPicturesGallery();
};

const createCard = (id, name, credit, price, img) => {
    const businessBtns = `<button type="button" class="btn btn-warning" id="pictureCartEditBtn-${id}"><i class="bi bi-pencil-square"></i></button>
                        <button type="button" class="btn btn-danger" id="pictureCartDeleteBtn-${id}"><i class="bi bi-trash"></i></button>`;
    const removeFromCartBtn = `<button type="button" class="btn btn-danger" id="pictureRemoveFromCartBtn-${id}"><i class="bi bi-cart-x"></i></button>`;
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
                    
                        ${isConnected ? '<div class="card-body text-center">' + removeFromCartBtn : ""}
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
    clearEventListener("pictureCartDeleteBtn", handleDeleteBtnClick);
    clearEventListener("pictureCartEditBtn", handleEditBtnClick);
    clearEventListener("pictureInfo", handleImgClick);
    clearEventListener("pictureRemoveFromCartBtn", handleRemoveFromCartBtnClick);
    let innerHTML = "";
    let pictureId;
    let user = getUserInfo();
    let emptyCart = document.getElementById("emptyCart");
    let cart = document.getElementById("cartPicturesGallery");
    if (!user || user.cart.length === 0) {
        emptyCart.classList.remove("d-none");
        cart.classList.add("d-none");
        return;
    }
    emptyCart.classList.add("d-none");
    cart.classList.remove("d-none");
    for (let picture of picturesArr) {
        pictureId = user.cart.find((id) => id === picture.id);
        if (pictureId) {
            innerHTML += createCard(
                picture.id,
                picture.title,
                picture.credit,
                picture.price,
                picture.imgURL);
        }
    }
    if (!innerHTML) {
        emptyCart.classList.remove("d-none");
        cart.classList.add("d-none");
        return;
    }
    galleryDiv.innerHTML = innerHTML;
    createEventListener("pictureCartDeleteBtn", handleDeleteBtnClick);
    createEventListener("pictureCartEditBtn", handleEditBtnClick);
    createEventListener("pictureInfo", handleImgClick);
    createEventListener("pictureRemoveFromCartBtn", handleRemoveFromCartBtnClick);
};

//Deletes picture when clicking on delete button
const handleDeleteBtnClick = (ev) => {
    deletePicture(getIdFromClick(ev));
    removePictureFromCart(getIdFromClick(ev));
};

const handleEditBtnClick = (ev) => {
    showPopup(getIdFromClick(ev));
};

const handleRemoveFromCartBtnClick = (ev) => {
    removePictureFromCart(getIdFromClick(ev));
};

const removePictureFromCart = (pictureId) => {
    pictureId = +pictureId;
    let user = getUserInfo();
    if (user) {
        user.cart = user.cart.filter(
            (item) => item !== pictureId);
    }
    localStorage.setItem("users", JSON.stringify(users));
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

const handleImgClick = (ev) => {
    showInfoPopup(getIdFromClick(ev));
};

const getIdFromClick = (ev) => {
    let idFromId = ev.target.id.split("-");

    //If pressed on the icon
    if (!ev.target.id) {
        idFromId = ev.target.parentElement.id.split("-");
    }
    return +idFromId[1];
};

export { initialCartPicturesGallery, updateCartGallery };