import crypto from "crypto";

// 26 * 2 + 10 = 62
const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";

/**
 * Gets an identifier consisting of 6 alphanumeric characters given a URL. 
 * 
 * // TODO err / input handling 
 * 
 * @param {String} url The URL to use for generating an identifier
 * @returns {String} an identifier 
 */
export function getIdentifier(url) {
    const hash = crypto.createHash("sha256")
        .update(url)
        .digest();

    return Array.from(hash)
        .slice(0,6)
        .map(index => chars[index % 62])
        .reduce((acc, curr) => acc.toString() + curr.toString(), "");
}
