# License Plate Generator

Hi Yin and Dom.

Here's the working version of the license plate maker.

I've included **types** and **tests**.

This License Plate Generator does its best to be _flexible_.

You can customize:

1. The characters you want to use.
2. The lengths of permutations.
3. Rules you want to filter by.
4. Mutators you want to mutate with (and they allow conditionals too!). Ex: add dash if length is 6

## Sample Usage

```typescript
type Rule = (str: string) => boolean;
type Mutator = { condition: (str: string) => boolean; action: (str: string) => string };

const chars = ['a', 'b', 'c', '1', '2', '3'];
const lengths = [5, 6];
const rules = [digitsAreUnique, alternatesBetweenLettersAndDigits, digitsAreInDecreasingOrder];
const mutators: Mutator[] = [splitSixCharStringWithDashMutator];

const ourNiceLicensePlates = generateLicensePlates(chars, lengths, rules, mutators);
```
