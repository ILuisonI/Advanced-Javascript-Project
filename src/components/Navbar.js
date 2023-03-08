import checkIfAdmin from "../utilities/checkIfBusiness.js";
import checkIfConnected from "../utilities/checkIfConnected.js";

let isAdmin;
let isConnected;
let showPopup;

let navAddNewPictureLink;
const navEditProfilePage = document.getElementById("nav-edit-name-link");
const navCartPage = document.getElementById("nav-cart-link");

const navBeforeLogin = document.getElementById("navBeforeLogin");
const navAfterLogin = document.getElementById("navAfterLogin");

const initializeNavbar = (showPopupFromHomePage) => {
    isAdmin = checkIfAdmin();
    isConnected = checkIfConnected();
    if (isConnected) {
        navBeforeLogin.classList.add("d-none");
        navAfterLogin.classList.remove("d-none");
        let user = JSON.parse(localStorage.getItem("token"));
        navEditProfilePage.innerHTML = user.name;
    }
    showPopup = showPopupFromHomePage;

    navAddNewPictureLink = document.getElementById("nav-add-new-picture-link");
    if (!isAdmin) {
        navAddNewPictureLink.classList.add("d-none");
    } else {
        navAddNewPictureLink.classList.remove("d-none");
    }
    navAddNewPictureLink.addEventListener("click", () => {
        showPopup();
    });
};

export default initializeNavbar;