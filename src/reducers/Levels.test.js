import {mineLocationFor} from "./Levels";

describe("mineLocationsFor", () => {
    describe("when BEGINNER", () => {
        it("returns correct boardsize", () => {
            expect(mineLocationFor("BEGINNER")).toHaveLength(10);
        });
    });
    describe("when INTERMEDIATE", () => {
        it("returns correct boardsize", () => {
            expect(mineLocationFor("INTERMEDIATE")).toHaveLength(40);
        });
    });

    describe("when EXPERT", () => {
        it("returns correct boardsize", () => {
            expect(mineLocationFor("EXPERT")).toHaveLength(99);
        });
    });
});
