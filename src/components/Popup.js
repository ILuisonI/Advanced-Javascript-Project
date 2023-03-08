import Picture from "../models/Picture.js";
import getNextId from "../utilities/getNextId.js";
import { validateInitPopup, validatePopup } from "../validation/validateEditPopup.js";

let selectedPicture;
let editedPicture;

const editPicturePopupImg = document.getElementById("editPicturePopupImg");
const editPicturePopupImgURL = document.getElementById("editPicturePopupImgURL");
const editPicturePopupTitle = document.getElementById("editPicturePopupTitle");
const editPicturePopupSubtitle = document.getElementById("editPicturePopupSubtitle");
const editPicturePopupCredit = document.getElementById("editPicturePopupCredit");
const editPicturePopupPrice = document.getElementById("editPicturePopupPrice");
const editPicturePopupDescription = document.getElementById("editPicturePopupDescription");
const editPicturePopupCreatedAt = document.getElementById("editPicturePopupCreatedAt");
const editPicturePopup = document.getElementById("editPicturePopup");

const picturePopupImg = document.getElementById("cardPopupImg");
const picturePopupId = document.getElementById("cardPopupId");
const picturePopupTitle = document.getElementById("cardPopupTitle");
const pictureSubtitle = document.getElementById("cardPopupSubtitle");
const picturePopupDescription = document.getElementById("cardPopupDescription");
const picturePopupCreatedAt = document.getElementById("cardPopupCreatedAt");
const picturePopup = document.getElementById("pictureInfoPopup");

const initPopup = (selectedPictureFromHomePage, editedPictureFromHomePage) => {
    if (selectedPictureFromHomePage) {
        selectedPicture = selectedPictureFromHomePage;
        editPicturePopupImg.title = selectedPicture.title;
    } else {
        selectedPicture = new Picture(getNextId(), "", 0, "", "", "", "", "");
        editPicturePopupImg.title = "No Image Found";
    }
    editedPicture = editedPictureFromHomePage;
    editPicturePopupImg.src = selectedPicture.imgURL;
    editPicturePopupImgURL.value = selectedPicture.imgURL;
    editPicturePopupTitle.value = selectedPicture.title;
    editPicturePopupSubtitle.value = selectedPicture.subtitle;
    editPicturePopupCredit.value = selectedPicture.credit;
    editPicturePopupPrice.value = selectedPicture.price;
    editPicturePopupDescription.value = selectedPicture.description;
    editPicturePopupCreatedAt.value = selectedPicture.createdAt;
    validatePopup();
    showPopup();
};

const initInfoPopup = (selectedPictureFromHomePage) => {
    picturePopupImg.src = selectedPictureFromHomePage.imgURL;
    picturePopupImg.title = selectedPictureFromHomePage.title;
    picturePopupId.innerHTML = `ID: <b>${selectedPictureFromHomePage.id}</b>`;
    picturePopupTitle.innerHTML = `Title: <b>${selectedPictureFromHomePage.title}</b>`;
    pictureSubtitle.innerHTML = `Subtitle: <b>${selectedPictureFromHomePage.subtitle}</b>`;
    picturePopupDescription.innerHTML = `Description: <br><b>${selectedPictureFromHomePage.description}</b>`;
    picturePopupCreatedAt.innerHTML = `Created At: <b>${selectedPictureFromHomePage.createdAt}</b>`;
    showInfoPopup();
};

const showPopup = () => {
    editPicturePopup.classList.remove("d-none");
};

const showInfoPopup = () => {
    picturePopup.classList.remove("d-none");
};

const hidePopup = () => {
    editPicturePopup.classList.add("d-none");
};

const hideInfoPopup = () => {
    picturePopup.classList.add("d-none");
};

window.addEventListener("load", () => {
    validateInitPopup();

    editPicturePopup.addEventListener("click", (ev) => {
        if (ev.target.id !== "editPicturePopup" &&
            ev.target.id !== "editPicturePopupCancelBtn" &&
            ev.target.parentElement.id !== "editPicturePopupCancelBtn") {
            return;
        }
        hidePopup();
    });

    picturePopup.addEventListener("click", (ev) => {
        if (ev.target.id !== "pictureInfoPopup" &&
            ev.target.id !== "picturePopupCloseBtn" &&
            ev.target.parentElement.id !== "picturePopupCloseBtn") {
            return;
        }
        hideInfoPopup();
    });

    document.getElementById("editPicturePopupSaveBtn").addEventListener("click", () => {
        selectedPicture.imgURL = editPicturePopupImgURL.value;
        selectedPicture.title = editPicturePopupTitle.value;
        selectedPicture.subtitle = editPicturePopupSubtitle.value;
        selectedPicture.credit = editPicturePopupCredit.value;
        selectedPicture.createdAt = editPicturePopupCreatedAt.value;
        selectedPicture.description = editPicturePopupDescription.value;
        selectedPicture.price = editPicturePopupPrice.value;
        editedPicture(selectedPicture);
        hidePopup();
    });
});



export { initPopup, showPopup, initInfoPopup };