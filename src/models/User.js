class User {
    id;
    name;
    lastName;
    email;
    password;
    state;
    country;
    city;
    street;
    houseNumber;
    zipCode;
    phoneNumber;
    isBusiness;
    cart;
    constructor(id, name, lastName, email, password, state, country, city, street, houseNumber, zipCod, phoneNumber, isBusiness) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.state = state;
        this.country = country;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.zipCode = zipCod;
        this.phoneNumber = phoneNumber;
        this.isBusiness = isBusiness;
        this.cart = [];
    }
}

export default User;