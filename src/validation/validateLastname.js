import validate from "./validate.js";

const validateLastname = (value) => {
    const reg = new RegExp("^[A-Z][a-z0-9-\\s]{0,}$", "g");
    return validate(reg, value, 2, 255).map((err) => `Last Name is ${err}`);
};

export default validateLastname;