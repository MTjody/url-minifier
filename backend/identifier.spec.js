import { getIdentifier } from "./identifier";

const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
    value: {
        getRandomValues: arr => crypto.randomBytes(arr.length)
    },
});

describe("getIdentifier", () => {
    it("returns a string of 6 characters length", () => {
        const identifier = getIdentifier();
        expect(typeof identifier).toBe("string");
        expect(identifier.length).toBe(6);
    });
    it("returns a string containing characters from a-z, A-z, 0-9", () => {
        const identifier = getIdentifier();
        const regex = /[a-zA-Z0-9]/g;
        expect(regex.test(identifier)).toBe(true);
    });
});
