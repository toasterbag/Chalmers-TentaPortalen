## Fragile solutions
This is a list of fragile solutions that should be reconsidered as they may break on edge cases.
- Academic year conversion is hardcoded in several parts of the import logic. This breaks frequently. Perhaps we can use the academic calendar available on the student portal?
- Some courses have multiple instances in the same year and won't parse properly, TDA384 and TIN093 are two examples of this.
- When building you have to manually copy the prisma cients into dist/prisma