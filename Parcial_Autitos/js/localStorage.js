export function getLocalStorageData(storageKey) {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

export function setLocalStorageData(storageKey, lista) {
    localStorage.setItem(storageKey, JSON.stringify(lista));
}