import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validateName from "../validation/validateName.js";
import validateLastname from "../validation/validateLastname.js";
import validatePassword from "../validation/validatePassword.js";
import User from "../models/User.js";
import showToast from "../services/Toast.js";

const inputName = document.getElementById("register-input-name");
const inputLastname = document.getElementById("register-input-lastname");
const inputState = document.getElementById("register-input-state");
const inputCountry = document.getElementById("register-input-country");
const inputCity = document.getElementById("register-input-city");
const inputStreet = document.getElementById("register-input-street");
const inputHouseNumber = document.getElementById("register-input-house-number");
const inputZipCode = document.getElementById("register-input-zip-code");
const inputEmail = document.getElementById("register-input-email");
const inputPhone = document.getElementById("register-input-phone");
const inputPassword = document.getElementById("register-input-password");
const inputConfirmPassword = document.getElementById("register-input-confirm-password");
const inputBusiness = document.getElementById("register-check-business");

const btnRegister = document.querySelector("#register-btn");
const btnCancel = document.querySelector("#cancel-btn");

let nameOk = false;
let lastnameOk = false;
let emailOk = false;
let passwordOk = false;
let confirmPasswordOk = false;

window.addEventListener("load", () => {
    if (inputName.value) {
        checkNameInput();
    }
    if (inputLastname.value) {
        checkLastnameInput();
    }
    if (inputEmail.value) {
        checkEmailInput();
    }
    if (inputPassword.value) {
        checkPasswordInput();
    }
    if (inputConfirmPassword.value) {
        checkConfirmPasswordInput();
    }
});

const checkIfCanEnableBtn = () => (btnRegister.disabled = !(nameOk && lastnameOk && emailOk && passwordOk && confirmPasswordOk));

const checkNameInput = () => {
    let errorArr = validateName(inputName.value);
    if (errorArr.length === 0) {
        inputName.classList.remove("is-invalid");
        document.getElementById("register-alert-name").classList.add("d-none");
        nameOk = true;
    } else {
        inputName.classList.add("is-invalid");
        document.getElementById("register-alert-name").classList.remove("d-none");
        document.getElementById("register-alert-name").innerHTML = errorArr.join("<br>");
        nameOk = false;
    }
    checkIfCanEnableBtn();
};

const checkLastnameInput = () => {
    let errorArr = validateLastname(inputLastname.value);
    if (errorArr.length === 0) {
        inputLastname.classList.remove("is-invalid");
        document.getElementById("register-alert-lastname").classList.add("d-none");
        lastnameOk = true;
    } else {
        inputLastname.classList.add("is-invalid");
        document.getElementById("register-alert-lastname").classList.remove("d-none");
        document.getElementById("register-alert-lastname").innerHTML = errorArr.join("<br>");
        lastnameOk = false;
    }
    checkIfCanEnableBtn();
};

const checkEmailInput = () => {
    let errorArr = validateEmail(inputEmail.value);
    if (errorArr.length === 0) {
        inputEmail.classList.remove("is-invalid");
        document.getElementById("register-alert-email").classList.add("d-none");
        emailOk = true;
    } else {
        inputEmail.classList.add("is-invalid");
        document.getElementById("register-alert-email").classList.remove("d-none");
        document.getElementById("register-alert-email").innerHTML = errorArr.join("<br>");
        emailOk = false;
    }
    checkIfCanEnableBtn();
};

const checkPasswordInput = () => {
    let errorArr = validatePassword(inputPassword.value);
    if (errorArr.length === 0) {
        inputPassword.classList.remove("is-invalid");
        document.getElementById("register-alert-password").classList.add("d-none");
        passwordOk = true;
    } else {
        inputPassword.classList.add("is-invalid");
        document.getElementById("register-alert-password").classList.remove("d-none");
        document.getElementById("register-alert-password").innerHTML = errorArr.join("<br>");
        passwordOk = false;
    }
    checkIfCanEnableBtn();
};

const checkConfirmPasswordInput = () => {
    if (inputConfirmPassword.value === inputPassword.value) {
        inputConfirmPassword.classList.remove("is-invalid");
        document.getElementById("register-alert-confirm-password").classList.add("d-none");
        confirmPasswordOk = true;
    } else {
        inputConfirmPassword.classList.add("is-invalid");
        document.getElementById("register-alert-confirm-password").classList.remove("d-none");
        confirmPasswordOk = false;
    }
    checkIfCanEnableBtn();
};

inputName.addEventListener("input", checkNameInput);

inputLastname.addEventListener("input", checkLastnameInput);

inputEmail.addEventListener("input", checkEmailInput);

inputPassword.addEventListener("input", checkPasswordInput);

inputConfirmPassword.addEventListener("input", checkConfirmPasswordInput);

btnRegister.addEventListener("click", () => {
    if (!(nameOk && emailOk && passwordOk)) {
        return;
    }
    let users = localStorage.getItem("users");
    let nextUserId = localStorage.getItem("nextUserId");
    let newUser = new User(+nextUserId++, inputName.value, inputLastname.value, inputEmail.value, inputPassword.value, inputState.value, inputCountry.value,
        inputCity.value, inputStreet.value, inputHouseNumber.value, inputZipCode.value, inputPhone.value, inputBusiness.checked);
    if (!users) {
        users = [newUser];
        localStorage.setItem("nextUserId", nextUserId + "");
        localStorage.setItem("users", JSON.stringify(users));
    } else {
        users = JSON.parse(users);
        for (let user of users) {
            if (user.email === inputEmail.value) {
                showToast("Email Already Exists!", false);
                return;
            }
        }
        users = [...users, newUser];
        localStorage.setItem("nextUserId", nextUserId + "");
        localStorage.setItem("users", JSON.stringify(users));
    }
    handlePageChange(PAGES.LOGIN);
});

btnCancel.addEventListener("click", () => {
    handlePageChange(PAGES.HOME);
});