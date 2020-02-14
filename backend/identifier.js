import crypto from "crypto";

// 26 * 2 + 10 = 62
const chars = ["A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

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
