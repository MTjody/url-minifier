const urlsKey = "minified.urls";
/**
 * Adds a Url object to localStorage up to 10 items, any object added afterwards will cause
 * the first added object in the array to be removed (FIFO).
 *
 * @param {object} urlObj An object containing keys url and minifiedUrl with their respective values
 */
export function addMinifiedUrl(urlObj) {
    let urls = JSON.parse(localStorage.getItem(urlsKey));
    if (urls === undefined || urls === null) {
        urls = [];
    } 

    if (urls.length === 10) {
        urls.shift();
    }
    urls.push(urlObj);
    localStorage.setItem(urlsKey, JSON.stringify(urls));
}

export function getMinifiedUrls() {
    return JSON.parse(localStorage.getItem(urlsKey));
}
