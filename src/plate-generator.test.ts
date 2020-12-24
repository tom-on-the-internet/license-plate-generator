import {
    alternatesBetweenLettersAndDigits,
    digitsAreInDecreasingOrder,
    digitsAreUnique,
    extractDigits,
    generateLicensePlates,
    generatePermutations,
    isLetter,
    splitSixCharStringWithDashMutator,
    splitStringWithDash,
} from './plate-generator';

describe('isLetter', () => {
    test('a is a letter', () => {
        expect(isLetter('a')).toBe(true);
    });

    test('3 is not a letter', () => {
        expect(isLetter('3')).toBe(false);
    });
});

describe('extractDigits', () => {
    test('it extracts digits', () => {
        expect(extractDigits('a1c2b3')).toBe('123');
    });

    test('it returns an empty string if there are no digits', () => {
        expect(extractDigits('abcdefg')).toBe('');
    });
});

describe('alternatesBetweenLettersAndDigits', () => {
    test('it returns true when alternating letters and numbers', () => {
        expect(alternatesBetweenLettersAndDigits('a1b2c3')).toBe(true);
    });

    test('it returns false when not alternating letters and numbers', () => {
        expect(alternatesBetweenLettersAndDigits('a1213bc')).toBe(false);
    });

    test('it return false when it starts with a number', () => {
        expect(alternatesBetweenLettersAndDigits('0a2b3c4d')).toBe(false);
    });

    test('an empty string is valid', () => {
        expect(alternatesBetweenLettersAndDigits('')).toBe(true);
    });
});

describe('digitsAreUnique', () => {
    test('it returns true when digits are unique', () => {
        expect(digitsAreUnique('123')).toBe(true);
    });

    test('it returns true when digits are unique and there are letters', () => {
        expect(digitsAreUnique('a1c2b3')).toBe(true);
    });
});

describe('digitsAreInDecreasingOrder', () => {
    test('it returns true if digits are in decreasing orders', () => {
        expect(digitsAreInDecreasingOrder('987')).toBe(true);
    });

    test('it returns true if digits are in decreasing orders and there are letters', () => {
        expect(digitsAreInDecreasingOrder('a9b8c7')).toBe(true);
    });

    // impossible given current rule set, but a good sanity check in case rules change
    test('it returns true if digits are in decreasing orders and there are duplicates', () => {
        expect(digitsAreInDecreasingOrder('98776')).toBe(true);
    });
});

describe('splitStringWithDash', () => {
    test('it splits strings with a dash', () => {
        expect(splitStringWithDash('banana')).toBe('ban-ana');
    });

    test('it works on odd length strings', () => {
        expect(splitStringWithDash('odd')).toBe('o-dd');
    });

    test('it retuns a dash on empty string', () => {
        expect(splitStringWithDash('')).toBe('-');
    });
});

describe('generatePermutations', () => {
    test('it generates permutations', () => {
        expect(generatePermutations(['a', 'b', '1', '2'], 2)).toEqual([
            'aa',
            'ab',
            'a1',
            'a2',
            'ba',
            'bb',
            'b1',
            'b2',
            '1a',
            '1b',
            '11',
            '12',
            '2a',
            '2b',
            '21',
            '22',
        ]);
    });

    test('it returns the characters as are if the length is 1', () => {
        expect(generatePermutations(['a', 'b', '1', '2'], 1)).toEqual(['a', 'b', '1', '2']);
    });

    test('it returns an empty set on length 0', () => {
        expect(generatePermutations(['a', 'b', '1', '2'], 0)).toEqual([]);
    });

    test('it returns the characters as are if the length is 1', () => {
        expect(generatePermutations(['a', 'b', '1', '2'], 1)).toEqual(['a', 'b', '1', '2']);
    });
});

describe('generateLicensePlates', () => {
    test('it generates license plates', () => {
        expect(generateLicensePlates(['a', '1'], [2], [])).toEqual(['aa', 'a1', '1a', '11']);
    });

    test('it handles multiple lengths', () => {
        expect(generateLicensePlates(['a', '1'], [1, 2], [])).toEqual(['a', '1', 'aa', 'a1', '1a', '11']);
    });

    test('it filters using rules', () => {
        expect(generateLicensePlates(['a', '1'], [1, 2], [alternatesBetweenLettersAndDigits])).toEqual(['a', 'a1']);
    });

    // @Dom - This is the result we wanted to get today
    test('it modifies using mutators', () => {
        expect(
            generateLicensePlates(
                ['a', 'b', 'c', '1', '2', '3'],
                [5, 6],
                [digitsAreUnique, alternatesBetweenLettersAndDigits, digitsAreInDecreasingOrder],
                [splitSixCharStringWithDashMutator],
            ),
        ).toEqual([
            'a2a1a',
            'a2a1b',
            'a2a1c',
            'a2b1a',
            'a2b1b',
            'a2b1c',
            'a2c1a',
            'a2c1b',
            'a2c1c',
            'a3a1a',
            'a3a1b',
            'a3a1c',
            'a3a2a',
            'a3a2b',
            'a3a2c',
            'a3b1a',
            'a3b1b',
            'a3b1c',
            'a3b2a',
            'a3b2b',
            'a3b2c',
            'a3c1a',
            'a3c1b',
            'a3c1c',
            'a3c2a',
            'a3c2b',
            'a3c2c',
            'b2a1a',
            'b2a1b',
            'b2a1c',
            'b2b1a',
            'b2b1b',
            'b2b1c',
            'b2c1a',
            'b2c1b',
            'b2c1c',
            'b3a1a',
            'b3a1b',
            'b3a1c',
            'b3a2a',
            'b3a2b',
            'b3a2c',
            'b3b1a',
            'b3b1b',
            'b3b1c',
            'b3b2a',
            'b3b2b',
            'b3b2c',
            'b3c1a',
            'b3c1b',
            'b3c1c',
            'b3c2a',
            'b3c2b',
            'b3c2c',
            'c2a1a',
            'c2a1b',
            'c2a1c',
            'c2b1a',
            'c2b1b',
            'c2b1c',
            'c2c1a',
            'c2c1b',
            'c2c1c',
            'c3a1a',
            'c3a1b',
            'c3a1c',
            'c3a2a',
            'c3a2b',
            'c3a2c',
            'c3b1a',
            'c3b1b',
            'c3b1c',
            'c3b2a',
            'c3b2b',
            'c3b2c',
            'c3c1a',
            'c3c1b',
            'c3c1c',
            'c3c2a',
            'c3c2b',
            'c3c2c',
            'a3a-2a1',
            'a3a-2b1',
            'a3a-2c1',
            'a3b-2a1',
            'a3b-2b1',
            'a3b-2c1',
            'a3c-2a1',
            'a3c-2b1',
            'a3c-2c1',
            'b3a-2a1',
            'b3a-2b1',
            'b3a-2c1',
            'b3b-2a1',
            'b3b-2b1',
            'b3b-2c1',
            'b3c-2a1',
            'b3c-2b1',
            'b3c-2c1',
            'c3a-2a1',
            'c3a-2b1',
            'c3a-2c1',
            'c3b-2a1',
            'c3b-2b1',
            'c3b-2c1',
            'c3c-2a1',
            'c3c-2b1',
            'c3c-2c1',
        ]);
    });
});
