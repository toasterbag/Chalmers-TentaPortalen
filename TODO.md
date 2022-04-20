# Todo
[ ] LSP530 has overlapping examiner on survey analysis
[ ] All components use setup
[ ] All components are PascalCased
[ ] All routes use setup
[ ] All routes use PascalCase
[ ] All router link names are PascalCased
[ ] Typed API
  [ ] Port new backend from flavourdome
[ ] Contribution profiles
  [ ] Signup
  [ ] Login
  [ ] Shadowban
  [ ] Contribution adds points
  [ ] High scores

# Todo low priority
[ ] Colorblind mode
[ ] Rankings: add terms to query parameters

## Fragile solutions
This is a list of fragile solutions that should be reconsidered as they may break on edge cases.
- Academic year conversion is hardcoded in several parts of the import logic. This breaks frequently. Perhaps we can use the academic calendar available on the student portal?
- Some courses have multiple instances in the same year and won't parse properly, TDA384 and TIN093 are two examples of this.