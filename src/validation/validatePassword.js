import validate from "./validate.js";

const validatePassword = (value) => {
    const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,255}$", "g");
    return validate(reg, value, 2, 255).map((err) => `Password is ${err}`);
};

export default validatePassword;