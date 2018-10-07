window.onload = function () {
    var input = document.getElementById('input');
    var output = document.getElementById('output');

    ['change', 'keypress', 'paste'].forEach(function (event) {
        input.addEventListener(event, inputHandler);
    });

    function inputHandler() {
        delay(function () {
            try {
                output.innerHTML = convert(parseInt(input.value));
            } catch (err) {
                output.innerHTML = err;
            }
        }, 200);
    };

    //throttle user input
    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
};

function convert(num) {
    const TEN = 1e1;
    const ONE_HUNDRED = 1e2;
    const ONE_THOUSAND = 1e3;
    const ONE_MILLION = 1e6;
    const ONE_BILLION = 1e9;
    const ONE_TRILLION = 1e12;
    const ONE_QUADRILLION = 1e15;
    const MAX = 9007199254740992;//maximal safe number in Javascript

    const BELOW_TWENTY = [
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];

    const BELOW_HUNDRED = [
        'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];

    const MAX_SAFE_INTEGER = 9007199254740991;

    function isFinite(value) {
        return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
    }

    function isSafeNumber(value) {
        return typeof value === 'number' && Math.abs(value) <= MAX_SAFE_INTEGER;
    }

    function toWords(number) {
        var words;
        var num = parseInt(number, 10);

        if (!isFinite(num)) {
            throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
        }

        if (!isSafeNumber(num)) {
            throw new RangeError('Input is not a safe number, it’s either too large or too small.');
        }

        words = generateWords(num);
        return words;
    }

    function generateWords(number) {
        var remainder, word, words = arguments[1];

        // Just zero
        if (number === 0) {
            return !words ? 'zero' : words.join(' ').replace(/,$/, '');
        }

        // Iniate array
        if (!words) {
            words = [];
        }

        // If negative, prepend “minus”
        if (number < 0) {
            words.push('minus');
            number = Math.abs(number);
        }

        if (number < 20) {
            remainder = 0;
            word = BELOW_TWENTY[number];
        } else if (number < ONE_HUNDRED) {
            remainder = number % TEN;
            word = BELOW_HUNDRED[Math.floor(number / TEN)];
            // In case of remainder, we need to handle it here to be able to add the whitespace
            if (remainder) {
                word += ' ' + BELOW_TWENTY[remainder];
                remainder = 0;
            }

        } else if (number < ONE_THOUSAND) {
            remainder = number % ONE_HUNDRED;
            word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';

        } else if (number < ONE_MILLION) {
            remainder = number % ONE_THOUSAND;
            word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand,';

        } else if (number < ONE_BILLION) {
            remainder = number % ONE_MILLION;
            word = generateWords(Math.floor(number / ONE_MILLION)) + ' million,';

        } else if (number < ONE_TRILLION) {
            remainder = number % ONE_BILLION;
            word = generateWords(Math.floor(number / ONE_BILLION)) + ' billion,';

        } else if (number < ONE_QUADRILLION) {
            remainder = number % ONE_TRILLION;
            word = generateWords(Math.floor(number / ONE_TRILLION)) + ' trillion,';

        } else if (number <= MAX) {
            remainder = number % ONE_QUADRILLION;
            word = generateWords(Math.floor(number / ONE_QUADRILLION)) + ' quadrillion,';
        }

        words.push(word);
        return generateWords(remainder, words);
    }

    return toWords(num);
}