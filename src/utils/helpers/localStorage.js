export const saveToLocalStore = (key, value) => {
    localStorage.setItem(key, value);
}

export const deleteFromLocalStore = key => {
    localStorage.removeItem(key);
}

export const getFromLocalStore = key => {
    return localStorage.getItem(key);
}