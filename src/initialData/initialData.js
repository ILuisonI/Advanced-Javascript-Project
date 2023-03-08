import Picture from "../models/Picture.js"
import initialData from "/initialData.json" assert {type: "json"}

let id = 1;
let nextUserId = 1;

const createData = () => {
    let picturesArr = [
        new Picture(
            id++,
            initialData.initialData[0].credit,
            initialData.initialData[0].price,
            initialData.initialData[0].title,
            initialData.initialData[0].imgURL,
            initialData.initialData[0].description,
            initialData.initialData[0].subtitle,
            initialData.initialData[0].createdAt
        ),
        new Picture(
            id++,
            initialData.initialData[1].credit,
            initialData.initialData[1].price,
            initialData.initialData[1].title,
            initialData.initialData[1].imgURL,
            initialData.initialData[1].description,
            initialData.initialData[1].subtitle,
            initialData.initialData[1].createdAt
        ),
        new Picture(
            id++,
            initialData.initialData[2].credit,
            initialData.initialData[2].price,
            initialData.initialData[2].title,
            initialData.initialData[2].imgURL,
            initialData.initialData[2].description,
            initialData.initialData[2].subtitle,
            initialData.initialData[2].createdAt
        ),
        new Picture(
            id++,
            initialData.initialData[3].credit,
            initialData.initialData[3].price,
            initialData.initialData[3].title,
            initialData.initialData[3].imgURL,
            initialData.initialData[3].description,
            initialData.initialData[3].subtitle,
            initialData.initialData[3].createdAt
        ),
        new Picture(
            id++,
            initialData.initialData[4].credit,
            initialData.initialData[4].price,
            initialData.initialData[4].title,
            initialData.initialData[4].imgURL,
            initialData.initialData[4].description,
            initialData.initialData[4].subtitle,
            initialData.initialData[4].createdAt
        ),
        new Picture(
            id++,
            initialData.initialData[5].credit,
            initialData.initialData[5].price,
            initialData.initialData[5].title,
            initialData.initialData[5].imgURL,
            initialData.initialData[5].description,
            initialData.initialData[5].subtitle,
            initialData.initialData[5].createdAt
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