import validate from "./validate.js";

const validateEmail = (value) => {
    const regEmail = new RegExp("^\\w+([\\.-]\\w+)*@\\w+([\\.-]\\w+)*(\\.\\w{2,3})+$", "ig");
    return validate(regEmail, value, 5, 255).map((err) => `Email is ${err}`);
};

export default validateEmail;