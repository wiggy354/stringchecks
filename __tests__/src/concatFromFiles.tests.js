const StringChecks = require("../../main/src/stringchecks");
const ReadFromFile = require("../../main/src/readfromfiles");

describe("concatFromFiles", () => {
    let stringChecks

    beforeAll(() => {
        stringChecks = new StringChecks()
    })

    test("All 3 mocked", () => {
        let spy1 = jest.spyOn(ReadFromFile.prototype, 'readFromFile1').mockImplementation(() => {
            return 'readFromFile1() is mocked'
        })
        let spy2 = jest.spyOn(ReadFromFile.prototype, 'readFromFile2').mockImplementation(() => {
            return 'readFromFile2() is mocked'
        })
        let spy3 = jest.spyOn(ReadFromFile.prototype, 'readFromFile3').mockImplementation(() => {
            return 'readFromFile3() is mocked'
        })

        const output =
            'readFromFile1() is mAcked, '
            + 'readFromFile2() is mocked, '
            + 'readFromFile3() is mocked.'
        expect(stringChecks.concatFromFiles()).toEqual(output)

        spy1.mockRestore()
        spy2.mockRestore()
        spy3.mockRestore()
    })

    test("Not Mocked", () => {
        const output =
            'readFromFile1() NOT MOCKED, '
            + 'readFromFile2() NOT MOCKED, '
            + 'readFromFile3() NOT MOCKED.'
        expect(stringChecks.concatFromFiles()).toEqual(output)
    })

    test("file 1 mocked only", () => {
        let spy = jest.spyOn(ReadFromFile.prototype, 'readFromFile1').mockImplementation(() => {
            return 'readFromFile1() is mocked'
        })

        const output =
            'readFromFile1() is mocked, '
            + 'readFromFile2() NOT MOCKED, '
            + 'readFromFile3() NOT MOCKED.'
        expect(stringChecks.concatFromFiles()).toEqual(output)

        spy.mockRestore()
    })

    test("file 2 mocked only", () => {
        let spy = jest.spyOn(ReadFromFile.prototype, 'readFromFile2').mockImplementation(() => {
            return 'readFromFile2() is mocked'
        })

        const output =
            'readFromFile1() NOT MOCKED, '
            + 'readFromFile2() is mocked, '
            + 'readFromFile3() NOT MOCKED.'
        expect(stringChecks.concatFromFiles()).toEqual(output)

        spy.mockRestore()
    })

    test("file 3 mocked only", () => {
        let spy = jest.spyOn(ReadFromFile.prototype, 'readFromFile3').mockImplementation(() => {
            return 'readFromFile3() is mocked'
        })


        const output =
            'readFromFile1() NOT MOCKED, '
            + 'readFromFile2() NOT MOCKED, '
            + 'readFromFile3() is mocked.'
        expect(stringChecks.concatFromFiles()).toEqual(output)

        spy.mockRestore()
    })
})