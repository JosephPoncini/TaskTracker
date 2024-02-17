const saveToLocalStorage = (task) => {

    let tasks = getlocalStorage();

    if (!tasks.includes(task)) {
        tasks.push(task);
    }

    localStorage.setItem("Tasks", JSON.stringify(tasks));
}

const getlocalStorage = () => {

    let localStorageData = localStorage.getItem("Tasks");

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (index) => {

    let tasks = getlocalStorage();

    tasks.splice(index, 1);

    localStorage.setItem("Tasks", JSON.stringify(tasks))

}

export {saveToLocalStorage, getlocalStorage, removeFromLocalStorage}