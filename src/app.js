import PAGES from "./models/pageModel.js";
import { handlePageChange } from "./routes/router.js";
import "./pages/RegisterPage.js";
import "./pages/LoginPage.js";
import "./pages/HomePage.js";
import "./initialData/initialData.js";
import "./pages/ProfilePage.js";
import { showNewPopup } from "./pages/HomePage.js";
import initializeNavbar from "./components/Navbar.js";

const navHomeLink = document.getElementById("nav-home-link");
const navAboutUsLink = document.getElementById("nav-aboutus-link");
const navRegisterLink = document.getElementById("nav-register-link");
const navRegisterLoginLink = document.getElementById("nav-registerlogin-link");
const navLoginLink = document.getElementById("nav-login-link");
const navEditProfilePage = document.getElementById("nav-edit-name-link");
const navCartPage = document.getElementById("nav-cart-link");
const navLogout = document.getElementById("nav-logout");

window.addEventListener("load", () => {
    initializeNavbar(showNewPopup);
});

navHomeLink.addEventListener("click", () => {
    handlePageChange(PAGES.HOME);
});

navAboutUsLink.addEventListener("click", () => {
    handlePageChange(PAGES.ABOUT);
});

navRegisterLink.addEventListener("click", () => {
    handlePageChange(PAGES.REGISTER);
});

navLoginLink.addEventListener("click", () => {
    handlePageChange(PAGES.LOGIN);
});

navRegisterLoginLink.addEventListener("click", () => {
    handlePageChange(PAGES.REGISTER);
});

navEditProfilePage.addEventListener("click", () => {
    handlePageChange(PAGES.PROFILE);
});

navCartPage.addEventListener("click", () => {
    handlePageChange(PAGES.CART);
});

navLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.reload();
});