// 26 * 2 + 10 = 62
const chars = ["A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

export function getIdentifier() {
    const array = crypto.getRandomValues(new Uint8Array(6));

    // Array.from converts from Uint8Array to array of numbers.
    return Array.from(array)
        .map(index => chars[index % 62])
        .reduce((acc, curr) => acc.toString() + curr.toString(), "");
}
