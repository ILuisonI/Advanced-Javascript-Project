class Picture {
    id;
    credit;
    price;
    title;
    imgURL;
    description;
    subtitle;
    createdAt;
    constructor(id, credit, price, title, imgURL, description, subtitle, createdAt) {
        this.id = id;
        this.credit = credit;
        this.price = price;
        this.title = title;
        this.imgURL = imgURL;
        this.description = description;
        this.subtitle = subtitle;
        this.createdAt = createdAt;
    }
}

export default Picture;