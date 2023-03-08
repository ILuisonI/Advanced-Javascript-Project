const getNextId = () => {
    let nextId = localStorage.getItem("nextId");
    if (!nextId) {
        nextId = 1;
    }
    if (isNaN(nextId)) {
        nextId = 1;
    }
    nextId = +nextId;
    return nextId;
};

export default getNextId;