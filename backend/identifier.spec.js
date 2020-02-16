import { getIdentifier } from "./identifier";

describe("getIdentifier", () => {
    const testUrl = "https://gph.is/1Z8bw8m";

    it("returns a string of 6 characters length", () => {
        const identifier = getIdentifier(testUrl);
        expect(typeof identifier).toBe("string");
        expect(identifier.length).toBe(6);
    });
    it("returns a string containing characters from a-z, A-z, 0-9", () => {
        const identifier = getIdentifier(testUrl);
        const regex = /[a-zA-Z0-9]/g;
        expect(regex.test(identifier)).toBe(true);
    });
    it("generates the same string for a given input", () => {
        const identifier = getIdentifier(testUrl);
        for (let i = 0; i < 20; i++) {
            expect(getIdentifier(testUrl)).toBe(identifier);
        }
    });
});
