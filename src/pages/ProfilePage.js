import showToast from "../services/Toast.js";
import validateEmail from "../validation/validateEmail.js";
import validateName from "../validation/validateName.js";
import validatePassword from "../validation/validatePassword.js";
import validateLastname from "../validation/validateLastname.js";

const inputName = document.getElementById("profile-input-name");
const inputLastname = document.getElementById("profile-input-lastname");
const inputState = document.getElementById("profile-input-state");
const inputCountry = document.getElementById("profile-input-country");
const inputCity = document.getElementById("profile-input-city");
const inputStreet = document.getElementById("profile-input-street");
const inputHouseNumber = document.getElementById("profile-input-house-number");
const inputZipCode = document.getElementById("profile-input-zip-code");
const inputEmail = document.getElementById("profile-input-email");
const inputPhone = document.getElementById("profile-input-phone");
const inputPassword = document.getElementById("profile-input-password");
const inputConfirmPassword = document.getElementById("profile-input-confirm-password");
const inputBusiness = document.getElementById("profile-check-business");

const btnUpdate = document.querySelector("#update-btn");

let nameOk = false;
let lastnameOk = false;
let emailOk = false;
let passwordOk = false;
let confirmPasswordOk = false;

window.addEventListener("load", () => {
    let users = localStorage.getItem("users");
    let token = localStorage.getItem("token");
    if (!token) {
        return;
    }
    users = JSON.parse(users);
    token = JSON.parse(token);
    let user = users.find((item) => item.id === token.id);
    if (user) {
        inputName.value = user.name;
        inputLastname.value = user.lastName;
        inputState.value = user.state;
        inputCountry.value = user.country;
        inputCity.value = user.city;
        inputStreet.value = user.street;
        inputHouseNumber.value = user.houseNumber;
        inputZipCode.value = user.zipCode;
        inputPhone.value = user.phoneNumber;
        inputEmail.value = user.email;
        inputPassword.value = user.password;
        inputConfirmPassword.value = user.password;
        inputBusiness.checked = user.isBusiness;
    }
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

const checkIfCanEnableBtn = () => (btnUpdate.disabled = !(nameOk && lastnameOk && emailOk && passwordOk && confirmPasswordOk));

const checkNameInput = () => {
    let errorArr = validateName(inputName.value);
    if (errorArr.length === 0) {
        inputName.classList.remove("is-invalid");
        document.getElementById("profile-alert-name").classList.add("d-none");
        nameOk = true;
    } else {
        inputName.classList.add("is-invalid");
        document.getElementById("profile-alert-name").classList.remove("d-none");
        document.getElementById("profile-alert-name").innerHTML = errorArr.join("<br>");
        nameOk = false;
    }
    checkIfCanEnableBtn();
};

const checkLastnameInput = () => {
    let errorArr = validateLastname(inputLastname.value);
    if (errorArr.length === 0) {
        inputLastname.classList.remove("is-invalid");
        document.getElementById("profile-alert-lastname").classList.add("d-none");
        lastnameOk = true;
    } else {
        inputLastname.classList.add("is-invalid");
        document.getElementById("profile-alert-lastname").classList.remove("d-none");
        document.getElementById("profile-alert-lastname").innerHTML = errorArr.join("<br>");
        lastnameOk = false;
    }
    checkIfCanEnableBtn();
};

const checkEmailInput = () => {
    let errorArr = validateEmail(inputEmail.value);
    if (errorArr.length === 0) {
        inputEmail.classList.remove("is-invalid");
        document.getElementById("profile-alert-email").classList.add("d-none");
        emailOk = true;
    } else {
        inputEmail.classList.add("is-invalid");
        document.getElementById("profile-alert-email").classList.remove("d-none");
        document.getElementById("profile-alert-email").innerHTML = errorArr.join("<br>");
        emailOk = false;
    }
    checkIfCanEnableBtn();
};

const checkPasswordInput = () => {
    let errorArr = validatePassword(inputPassword.value);
    if (errorArr.length === 0) {
        inputPassword.classList.remove("is-invalid");
        document.getElementById("profile-alert-password").classList.add("d-none");
        passwordOk = true;
    } else {
        inputPassword.classList.add("is-invalid");
        document.getElementById("profile-alert-password").classList.remove("d-none");
        document.getElementById("profile-alert-password").innerHTML = errorArr.join("<br>");
        passwordOk = false;
    }
    checkIfCanEnableBtn();
};

const checkConfirmPasswordInput = () => {
    if (inputConfirmPassword.value === inputPassword.value) {
        inputConfirmPassword.classList.remove("is-invalid");
        document.getElementById("profile-alert-confirm-password").classList.add("d-none");
        confirmPasswordOk = true;
    } else {
        inputConfirmPassword.classList.add("is-invalid");
        document.getElementById("profile-alert-confirm-password").classList.remove("d-none");
        confirmPasswordOk = false;
    }
    checkIfCanEnableBtn();
};

inputName.addEventListener("input", checkNameInput);

inputEmail.addEventListener("input", checkEmailInput);

inputPassword.addEventListener("input", checkPasswordInput);

btnUpdate.addEventListener("click", () => {
    if (!(nameOk && emailOk && passwordOk)) {
        return;
    }
    let users = localStorage.getItem("users");
    let token = localStorage.getItem("token");
    if (users && token) {
        users = JSON.parse(users);
        token = JSON.parse(token);
        let userEmail = users.find((item) => item.email === inputEmail.value);
        let user = users.find((item) => item.id === token.id);
        if (userEmail && user.id !== userEmail.id) {
            showToast("Email Already Exists!", false);
            return;
        }
        if (user) {
            user.name = token.name = inputName.value;
            user.lastName = inputLastname.value;
            user.email = token.email = inputEmail.value;
            user.password = inputPassword.value;
            user.state = inputState.value;
            user.country = inputCountry.value;
            user.city = inputCity.value;
            user.street = inputStreet.value;
            user.houseNumber = inputHouseNumber.value;
            user.zipCode = inputZipCode.value;
            user.phoneNumber = inputPhone.value;
            user.isBusiness = token.isBusiness = inputBusiness.checked;
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("token", JSON.stringify(token));
            showToast("Profile Updated Successfully!");
            showToast("Moving To Homepage In 3 Seconds");
        }
    }
    setTimeout(() => { window.location.reload() }, 3000);
});