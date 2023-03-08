import PAGES from "../models/pageModel.js";

const HOMEPAGELINK = document.getElementById(PAGES.HOME);
const ABOUTUSPAGELINK = document.getElementById(PAGES.ABOUT);
const REGISTERPAGELINK = document.getElementById(PAGES.REGISTER);
const LOGINPAGELINK = document.getElementById(PAGES.LOGIN);
const PROFILEPAGELINK = document.getElementById(PAGES.PROFILE);
const CARTPAGELINK = document.getElementById(PAGES.CART);
const NOTFOUNDPAGELINK = document.getElementById(PAGES.NOTFOUND);

function handlePageChange(pageToDisplay) {
    HOMEPAGELINK.classList.remove("d-block");
    ABOUTUSPAGELINK.classList.remove("d-block");
    REGISTERPAGELINK.classList.remove("d-block");
    LOGINPAGELINK.classList.remove("d-block");
    PROFILEPAGELINK.classList.remove("d-block");
    NOTFOUNDPAGELINK.classList.remove("d-block");
    CARTPAGELINK.classList.remove("d-block");
    HOMEPAGELINK.classList.add("d-none");
    ABOUTUSPAGELINK.classList.add("d-none");
    REGISTERPAGELINK.classList.add("d-none");
    LOGINPAGELINK.classList.add("d-none");
    PROFILEPAGELINK.classList.add("d-none");
    NOTFOUNDPAGELINK.classList.add("d-none");
    CARTPAGELINK.classList.add("d-none");

    switch (pageToDisplay) {
        default:
            NOTFOUNDPAGELINK.classList.add("d-block");
            NOTFOUNDPAGELINK.classList.remove("d-none");
            break;
        case PAGES.HOME:
            HOMEPAGELINK.classList.add("d-block");
            HOMEPAGELINK.classList.remove("d-none");
            break;
        case PAGES.ABOUT:
            ABOUTUSPAGELINK.classList.add("d-block");
            ABOUTUSPAGELINK.classList.remove("d-none");
            break;
        case PAGES.REGISTER:
            REGISTERPAGELINK.classList.add("d-block");
            REGISTERPAGELINK.classList.remove("d-none");
            break;
        case PAGES.LOGIN:
            LOGINPAGELINK.classList.add("d-block");
            LOGINPAGELINK.classList.remove("d-none");
            break;
        case PAGES.PROFILE:
            PROFILEPAGELINK.classList.add("d-block");
            PROFILEPAGELINK.classList.remove("d-none");
            break;
        case PAGES.CART:
            CARTPAGELINK.classList.add("d-block");
            CARTPAGELINK.classList.remove("d-none");
            break;
    }
};

export { handlePageChange };