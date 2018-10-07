mocha.setup('bdd');
var assert = chai.assert;
var expect = chai.expect;

describe("convert", function () {
    it("throws range error on 86085608789197229439", function () {
        try {
            convert('8651148789116229439');
        } catch (err) {
            assert.equal(err.toString(), new RangeError('Input is not a safe number, it’s either too large or too small.').toString());
        }
    });

    it("throws type error on 'half of the hundred'", function () {
        try {
            convert('half of the hundred');
        } catch (err) {
            assert.equal(err.toString(), new TypeError('Not a finite number: half of the hundred (string)').toString());
        }
    });

    it("converts 1 to 'one'", function () {
        assert.equal(convert(1), 'one');
    });

    it("converts 11 to 'eleven'", function () {
        assert.equal(convert(11), 'eleven');
    });

    it("converts 23 to 'twenty three'", function () {
        assert.equal(convert(23), 'twenty three');
    });

    it("converts 1e2 to '1e2'", function () {
        assert.equal(convert(1e2), 'one hundred');
    });

    it("converts 610 to 'six hundred ten'", function () {
        assert.equal(convert(610), 'six hundred ten');
    });

    it("converts 3879 to 'three thousand, eight hundred seventy nine'", function () {
        assert.equal(convert(3879), 'three thousand, eight hundred seventy nine');
    });

    it("converts 85150 to 'eighty five thousand, one hundred fifty'", function () {
        assert.equal(convert(85150), 'eighty five thousand, one hundred fifty');
    });

    it("converts 629116 to 'six hundred twenty nine thousand, one hundred sixteen'", function () {
        assert.equal(convert(629116), 'six hundred twenty nine thousand, one hundred sixteen');
    });

    it("converts 2584540 to 'two million, five hundred eighty four thousand, five hundred forty'", function () {
        assert.equal(convert(2584540), 'two million, five hundred eighty four thousand, five hundred forty');
    });

    it("converts 98062688 to 'ninety eight million, sixty two thousand, six hundred eighty eight'", function () {
        assert.equal(convert(98062688), 'ninety eight million, sixty two thousand, six hundred eighty eight');
    });

    it("converts 930517147 to 'nine hundred thirty million, five hundred seventeen thousand, one hundred forty seven'", function () {
        assert.equal(convert(930517147), 'nine hundred thirty million, five hundred seventeen thousand, one hundred forty seven');
    });

    it("converts 1407595823 to 'one billion, four hundred seven million, five hundred ninety five thousand, eight hundred twenty three'", function () {
        assert.equal(convert(1407595823), 'one billion, four hundred seven million, five hundred ninety five thousand, eight hundred twenty three');
    });

    it("converts 77576527769 to 'seventy seven billion, five hundred seventy six million, five hundred twenty seven thousand, seven hundred sixty nine'", function () {
        assert.equal(convert(77576527769), 'seventy seven billion, five hundred seventy six million, five hundred twenty seven thousand, seven hundred sixty nine');
    });
});

mocha.run();
