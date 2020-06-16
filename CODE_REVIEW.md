# Code Review

## Preface
My last experience with Angular was 6+ years ago with Angular version 1. Much has changed since then!

Given that distance and how much Angular has changed, there are definitely gaps in my understanding of the broader architecture. Because the job description said "knows Angular or is eager to learn" I am still proceeding with this exercise in order to demonstrate:

1) That I am a strong Javascript developer with general lead-level skills who can learn the latest Angular quickly enough to operate proficiently in your codebase within my first couple of weeks on the job, and

2) That I am capable of collaborating at and communicating at a lead level

## Architecture Comments

I have spent the past couple of months working with React, Redux, and Typescript in my spare time to educate myself. Those tools were not used at my last position. I also have been writing Javascript for about 15 years at this point.

Much of what I am seeing is familiar:
- npm package management/build/commands
- Express-based development servers
- ES2020/Typescript
- jest test runner
- Writing actions and reducers for NgRx is very similar to writing them for redux
- SCSS

And some is unfamiliar:
- The extensive usage of decorators in today's Angular
- Two-way data binding (was a fundamental concept in Angular 1/Backbone/.Net MVC/etc, but I've been in a mindset of unidirectional binding with React recently so it's a shift here)
- I had never used Nx, but am going to learn about it now regardless of whether I get hired to this position since it's also available for the React ecosystem

One fundamental improvement I would make would be to localize strings in this app [following practices described in Angular's documention](https://angular.io/guide/i18n). As the app was built with lots of English string fragments dropped directly into the templates and no annotation/translation, it would be a significant amount of work to make it usable for non-English-speaking audiences.

A second improvement I'd is the e2e test runner is not set up to be very DRY right now. It could use a sprint 0 to make some common UI interactions reusable in multiple tests (examples: submit a search to a form, open the reading list, etc).

## Issues

- `npm install` noted 11 security vulnerabilities (3 high/8 low). The high severity issues and 1 low severity issue were fixed easily by running `npm audit fix`, leaving 7 low severity prototype pollution issues all from the `yargs-parser` package. Some [online research](https://stackoverflow.com/questions/61535702/prototype-pollution-npm-vulnerability-cant-be-fixed) led me to determine this is a known issue that only effects development environments, and that I shouldn't spend further time on it during this exercise.

- Accessibility issues:
    - There was not a sufficient contrast ratio between background and foreground colors for the empty text that displays on book search page load. So this text may be difficult to read for some users. I changed the color of the text from `@gray40` to `@gray60` to make the validator pass.
    - There was no `aria-label` attribute on the search button which contained an icon instead of text, so screenreaders will read it out as "button" which is confusing. I added this.
    - Book titles in search results were in a `div` tag instead of a semantic heading tag such as `h2` which will make results seem to blur together for users on screen readers. I added this.
    - The book grid would benefit from an `aria-live="assertive"` attribute since it dynamically updates when entering results and is an important update. I added this.

- `npm run lint` found no lint issues (before or after my fixes for other issues)

- `npm run e2e` had no failing specs, but had one disabled spec as noted in test instructions. This will be fixed in the Task 2 branch/PR.

- `npm run test` found two failing tests in `libs/books/data-access/src/lib/+state/reading-list.reducer.ts`. These will be fixed in the Task 3 branch/PR.

- Performance issues. Not having done a lot of recent Angular work, it's unclear to me how many of the performance issues I encountered are simply because I'm testing in a development environment. For example the network payload is 6MB+, which seems likely to be a development-environment-only issue. It's possible deploying to production where assets are compiled/compressed/etc. would alleviate some/all. It's also possible some issues I'm experiencing are because I'm doing this exercise on an 8-year-old MacBook Pro. The Google Lighthouse plugin for Chrome reports most meaningful speed metrics (First Contentful Paint, Speed Index, First CPU Idle, etc) to be very slow but that could just mean my computer is slow.