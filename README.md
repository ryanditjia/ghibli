This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, npm install:

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## State management

No state management needed for film data, because we make use of `Next.js` server-side data fetching strategy (`getStaticProps`).

Simple state management (only `useState`) for form.

## Component structure & design

Since it’s a small app, I didn’t feel the need to break into smaller components.

## Page load efficiency

![](/lighthouse.png)

Could be improved:

- Add `next/head` for SEO meta tags (title, description, and so on)
- Add PWA capability using `next-pwa` package

## URL routing management

Uses `Next.js` routing

## Unit test

Uses `React-Testing-Library` with `Jest` for unit test.

If it weren’t for time constraint, I would prefer a more end-to-end test with Cypress/Playwright so we can test the login, session, server-side data fetching.

Ideal:

- Playwright
- MSW (Mock Service Worker) to mock the fetches

Would add at least the following E2E tests:

- happy path (not logged in => login form => logged in)
- login form incorrect credentials
- error on pages when: API errors or unknown film ID

## API best practices

### Error handling

`getStaticPaths` will handle the 404 (incorrect film ID)

### Session management & validation

Store session in cookie so it can be verified server-side. And sign the JWT with a secret so the token can’t be tampered with.

TTL is done using the cookie `maxAge`, as well as the expiry of the JWT token itself.

## Issues

Some films, e.g. Grave of the Fireflies, has non-standard `people` value, [see](https://ghibliapi.herokuapp.com/films/12cfb892-aac0-4c5b-94af-521852e46d6a). Due to time constraint, I used workaround to display no characters.
