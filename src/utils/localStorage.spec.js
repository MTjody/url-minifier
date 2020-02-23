import { addMinifiedUrl, getMinifiedUrls } from "./localStorage";

describe("LocalStorage", () => {
    describe("addMinifiedUrl", () => { 
        it("should add a Url object to a list in the localStorage", () => {
            addMinifiedUrl({some: "object"});
            expect(getMinifiedUrls()).toBeDefined();
        });
        it("should add a maximum of ten entries", () => {
            for (let i = 0 ; i < 20; i++) {
                addMinifiedUrl({i});
            }
            expect(getMinifiedUrls().length).toBe(10);
        });
        it("should remove the oldest entries first", () => {
            for (let i = 0 ; i < 20; i++) {
                addMinifiedUrl({i});
            }
            const urls = getMinifiedUrls();
            urls.forEach(urlObj => {
                expect(urlObj["i"]).toBeGreaterThan(9);
            });
        });
    });
});
