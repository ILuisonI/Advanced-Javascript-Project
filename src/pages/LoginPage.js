import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import emailValidate from "../validation/validateEmail.js";

const loginEmail = document.querySelector("#login-input-email");
const loginPassword = document.querySelector("#login-input-password");
const loginAlert = document.querySelector("#login-alert");
const btnLogin = document.querySelector("#login-btn");
let loginEmailOk = false;

const checkIfCanEnableLoginBtn = () => (btnLogin.disabled = !loginEmailOk);

window.addEventListener("load", () => {
    if (loginEmail.value) {
        checkIfCanEnableLoginBtn();
    }
});

loginEmail.addEventListener("input", () => {
    let errorArr = emailValidate(loginEmail.value);
    if (errorArr.length === 0) {
        //no error
        loginEmail.classList.remove("is-invalid");
        document.getElementById("login-alert-email").classList.add("d-none");
        loginEmailOk = true;
        checkIfCanEnableLoginBtn();
    } else {
        //error/s
        loginEmail.classList.add("is-invalid");
        document.getElementById("login-alert-email").classList.remove("d-none");
        document.getElementById("login-alert-email").innerHTML = errorArr.join("<br>");;
        loginEmailOk = false;
        checkIfCanEnableLoginBtn();
    }
});

btnLogin.addEventListener("click", () => {
    if (!loginEmailOk) {
        return;
    }
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
        return;
    }
    let user = users.find((item) => item.email === loginEmail.value && item.password === loginPassword.value);
    if (user) {
        localStorage.setItem("token", JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            isBusiness: user.isBusiness,
        }));
        location.reload();
        handlePageChange(PAGES.HOME);
        return;
    }
    loginAlert.classList.remove("d-none");
    loginAlert.classList.add("d-block");
});