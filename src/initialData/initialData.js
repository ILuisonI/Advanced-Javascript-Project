import Picture from "../models/Picture.js"
import initialData from "/initialData.json" assert {type: "json"}

let id = 1;
let nextUserId = 1;
let data = initialData.initialData;

const createData = () => {
    let picturesArr = [
        new Picture(
            id++,
            data[0].credit,
            data[0].price,
            data[0].title,
            data[0].imgURL,
            data[0].description,
            data[0].subtitle,
            data[0].createdAt
        ),
        new Picture(
            id++,
            data[1].credit,
            data[1].price,
            data[1].title,
            data[1].imgURL,
            data[1].description,
            data[1].subtitle,
            data[1].createdAt
        ),
        new Picture(
            id++,
            data[2].credit,
            data[2].price,
            data[2].title,
            data[2].imgURL,
            data[2].description,
            data[2].subtitle,
            data[2].createdAt
        ),
        new Picture(
            id++,
            data[3].credit,
            data[3].price,
            data[3].title,
            data[3].imgURL,
            data[3].description,
            data[3].subtitle,
            data[3].createdAt
        ),
        new Picture(
            id++,
            data[4].credit,
            data[4].price,
            data[4].title,
            data[4].imgURL,
            data[4].description,
            data[4].subtitle,
            data[4].createdAt
        ),
        new Picture(
            id++,
            data[5].credit,
            data[5].price,
            data[5].title,
            data[5].imgURL,
            data[5].description,
            data[5].subtitle,
            data[5].createdAt
        ),
    ];
    return picturesArr;
};

const setInitialData = () => {
    let pictures = localStorage.getItem("pictures");
    if (pictures) {
        return;
    }
    localStorage.setItem("pictures", JSON.stringify(createData()));
    localStorage.setItem("nextId", id + "");
    localStorage.setItem("nextUserId", nextUserId + "");
};

window.addEventListener("load", () => {
    setInitialData();
});