// We want to generate all possible vehicle plates following these rules:

//  - Possible characters are [a, b, c, 1, 2, 3]
//  - length can be 5 or 6 characters

//  - Needs to start with a letter and then alternate between letters and digits
//  - The same letter can appear multiple time
//  - Digits need to be unique and in decreasing order

//  (If 6 characters, add a dash in the middle)

// b3a-2c1 and c2b1c are valid examples.

type Rule = (str: string) => boolean;
type Mutator = { condition: (str: string) => boolean; action: (str: string) => string };

export function isLetter(c: string): boolean {
    return /^[A-Z]$/i.test(c);
}

export function isNotLetter(c: string): boolean {
    return !isLetter(c);
}

export function extractDigits(str: string): string {
    return str.split('').filter(isNotLetter).join('');
}

// slower than a regex, easier to read
export function digitsAreUnique(str: string): boolean {
    const digits = extractDigits(str);

    for (const digit of digits) {
        if (digits.indexOf(digit) !== digits.lastIndexOf(digit)) {
            return false;
        }
    }

    return true;
}

export function digitsAreInDecreasingOrder(str: string): boolean {
    const digits = extractDigits(str);

    return (
        digits ===
        digits
            .split('')
            .sort((a, b) => (a < b ? 1 : -1))
            .join('')
    );
}

export function alternatesBetweenLettersAndDigits(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
        const isEven = i % 2 === 0;
        if (isEven && !isLetter(str[i])) {
            return false;
        }
        if (!isEven && isLetter(str[i])) {
            return false;
        }
    }

    return true;
}

export function splitStringWithDash(str: string): string {
    const halfwayPoint = Math.floor(str.length / 2);
    return str.substr(0, halfwayPoint) + '-' + str.substr(halfwayPoint);
}

export function generatePermutations(chars: string[], length: number): string[] {
    if (length === 0) {
        return [];
    }

    if (length === 1) {
        return chars;
    }

    const previousResults = generatePermutations(chars, length - 1);

    const results = [];
    for (const result of previousResults) {
        for (const char of chars) {
            results.push(result + char);
        }
    }

    return results;
}

export function generateLicensePlates(
    chars: string[],
    lengths: number[],
    rules: Rule[] = [],
    mutators: Mutator[] = [],
): string[] {
    const allPermutations = lengths.reduce(
        (acc: string[], cur: number): string[] => [...acc, ...generatePermutations(chars, cur)],
        [],
    );

    const ruleObeyingPermutations = allPermutations.filter((permutation) => rules.every((rule) => rule(permutation)));

    const modifiedPermutations = ruleObeyingPermutations.map((permutation) =>
        mutators.reduce(
            (acc: string, cur: Mutator): string => (cur.condition(acc) ? cur.action(acc) : acc),
            permutation,
        ),
    );

    return modifiedPermutations;
}

export const splitSixCharStringWithDashMutator: Mutator = {
    condition: (str: string) => str.length === 6,
    action: (str: string) => splitStringWithDash(str),
};

// SAMPLE USAGE
const chars = ['a', 'b', 'c', '1', '2', '3'];
const lengths = [5, 6];
const rules = [digitsAreUnique, alternatesBetweenLettersAndDigits, digitsAreInDecreasingOrder];
const mutators: Mutator[] = [splitSixCharStringWithDashMutator];

const ourNiceLicensePlates = generateLicensePlates(chars, lengths, rules, mutators);
