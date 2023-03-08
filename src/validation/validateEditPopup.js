let validImgURL = false;
let validTitle = false;
let validSubtitle = false;
let validCredit = false;
let validCreatedAt = false;
let validDescription = false;
let validPrice = true;

const editPicturePopupImg = document.getElementById("editPicturePopupImg");
const editPicturePopupImgURL = document.getElementById("editPicturePopupImgURL");
const editPicturePopupTitle = document.getElementById("editPicturePopupTitle");
const editPicturePopupSubtitle = document.getElementById("editPicturePopupSubtitle");
const editPicturePopupCredit = document.getElementById("editPicturePopupCredit");
const editPicturePopupPrice = document.getElementById("editPicturePopupPrice");
const editPicturePopupDescription = document.getElementById("editPicturePopupDescription");
const editPicturePopupCreatedAt = document.getElementById("editPicturePopupCreatedAt");

const checkValidInputs = () => {
    if (validImgURL && validTitle && validSubtitle && validCredit && validCreatedAt && validDescription && validPrice) {
        document.getElementById("editPicturePopupSaveBtn").disabled = false;
    } else {
        document.getElementById("editPicturePopupSaveBtn").disabled = true;
    }
};

const makeValid = (valicCheck) => {
    switch (valicCheck) {
        case "imgURL":
            validImgURL = true;
            break;
        case "title":
            validTitle = true;
            break;
        case "subtitle":
            validSubtitle = true;
            break;
        case "credit":
            validCredit = true;
            break;
        case "createdAt":
            validCreatedAt = true;
            break;
        case "description":
            validDescription = true;
            break;
        case "price":
            validPrice = true;
            break;
    };
    checkValidInputs();
};

const makeNotValid = (valicCheck) => {
    switch (valicCheck) {
        case "imgURL":
            validImgURL = false;
            break;
        case "title":
            validTitle = false;
            break;
        case "subtitle":
            validSubtitle = false;
            break;
        case "credit":
            validCredit = false;
            break;
        case "createdAt":
            validCreatedAt = false;
            break;
        case "description":
            validDescription = false;
            break;
        case "price":
            validPrice = false;
            break;
    };
    checkValidInputs();
};

const validateInitPopup = () => {
    document.getElementById("editPicturePopupSaveBtn").disabled = true;
    editPicturePopupImgURL.addEventListener("input", () => {
        editPicturePopupImg.src = editPicturePopupImgURL.value;
        editPicturePopupImg.onerror = () => {
            editPicturePopupImgURL.classList.add("is-invalid");
            editPicturePopupImgURL.classList.remove("is-valid");
            makeNotValid("imgURL");
        };
        editPicturePopupImg.onload = () => {
            editPicturePopupImgURL.classList.remove("is-invalid");
            editPicturePopupImgURL.classList.add("is-valid");
            makeValid("imgURL");
        };
    });

    createInputEventListener(editPicturePopupTitle, "title");
    createInputEventListener(editPicturePopupSubtitle, "subtitle");
    createInputEventListener(editPicturePopupCredit, "credit");
    createInputEventListener(editPicturePopupCreatedAt, "createdAt");
    createInputEventListener(editPicturePopupDescription, "description");

    editPicturePopupPrice.addEventListener("input", () => {
        if (editPicturePopupPrice.value < 0) {
            editPicturePopupPrice.classList.add("is-invalid");
            editPicturePopupPrice.classList.remove("is-valid");
            makeNotValid("price");
        } else {
            editPicturePopupPrice.classList.remove("is-invalid");
            editPicturePopupPrice.classList.add("is-valid");
            makeValid("price");
        }
    });
};

const validatePopup = () => {
    document.getElementById("editPicturePopupSaveBtn").disabled = true;
    editPicturePopupImg.src = editPicturePopupImgURL.value;
    editPicturePopupImg.onerror = () => {
        editPicturePopupImgURL.classList.add("is-invalid");
        editPicturePopupImgURL.classList.remove("is-valid");
        makeNotValid("imgURL");
    };
    editPicturePopupImg.onload = () => {
        editPicturePopupImgURL.classList.remove("is-invalid");
        editPicturePopupImgURL.classList.add("is-valid");
        makeValid("imgURL");
    };

    if (!editPicturePopupTitle.value) {
        makeNotValid("title");
    } else {
        makeValid("title");
    }
    validateElement(editPicturePopupTitle, "title");
    validateElement(editPicturePopupSubtitle, "subtitle");
    validateElement(editPicturePopupCredit, "credit");
    validateElement(editPicturePopupCreatedAt, "createdAt");
    validateElement(editPicturePopupDescription, "description");

    if (editPicturePopupPrice.value < 0) {
        editPicturePopupPrice.classList.add("is-invalid");
        editPicturePopupPrice.classList.remove("is-valid");
        makeNotValid("price");
    } else {
        editPicturePopupPrice.classList.remove("is-invalid");
        editPicturePopupPrice.classList.add("is-valid");
        makeValid("price");
    }
};

const validateElement = (input, id) => {
    if (!input.value) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        makeNotValid(id);
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        makeValid(id);
    }
};

const createInputEventListener = (input, validCheck) => {
    input.addEventListener("input", () => {
        validateElement(input, validCheck);
    });
};

export { makeNotValid, makeValid, validateInitPopup, validatePopup };