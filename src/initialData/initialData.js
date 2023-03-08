import Picture from "../models/Picture.js"

let id = 1;
let nextUserId = 1;

const createData = () => {
    let picturesArr = [
        new Picture(
            id++,
            "Jill",
            50,
            "Life",
            "https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "Enjoying the sundown at the beach",
            "Beach Sundown",
            "Greek"
        ),
        new Picture(
            id++,
            "Craig",
            200,
            "Seasons",
            "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "Autumn is just around the corner",
            "Changing Seasons",
            "Germany"
        ),
        new Picture(
            id++,
            "Louis",
            100,
            "Blossom",
            "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "The start of the flowers blossoming",
            "Spring Time",
            "Japan"
        ),
        new Picture(
            id++,
            "Steve",
            20,
            "Abstract",
            "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "The magic of colors",
            "Magical Color",
            "Istanbul"
        ),
        new Picture(
            id++,
            "Quintine",
            50,
            "Top View",
            "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "The city in the eyes of birds",
            "Skyscrapers",
            "New York"
        ),
        new Picture(
            id++,
            "Katie",
            150,
            "Recharging Energy",
            "https://images.pexels.com/photos/1212693/pexels-photo-1212693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "A maginificent creature replanishing it's energy to continure the journey",
            "Butterfly",
            "Switzerland"
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