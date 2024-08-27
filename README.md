# PetSoft

This is an app for a fictional pet daycare platform. The purpose of building this was to get more comfortable with the newer features of NextJS (14), introduce myself to Tailwind and Typescript, newer hooks like useOptimistic, useFormStatus, useTransition, and try out some popular packages/libraries like Next-Auth, shadcn/ui, and Zod, as well as check out Stripe's payment form using redirects and a webhook listener route. It's a relatively cutting edge collection of libraries and patterns, all of which were new to me. The app itself is of course quite barebones, but under the hood it's pretty robust.

Check it out at

## The Stack

### NextJS

-   App Router
-   Server components

### Typescript

Everything is typed.

### Styling

-   TailwindCSS
-   cn/twMerge for combining class names for Tailwind
    -   dynamic styling & making reusable components that can be styled at the implementation level

### UI Libraries & Patterns

-   Customized shadcn/ui components
-   Optimistic UI
-   React-Hook-Form with Zod validation
-   Next Layouts

### State Management

-   Context API

### API

-   Server Actions
-   A few traditional routes

### Authentication

-   Next-Auth
    -   JWT strategy
    -   Credential provider
    -   Middleware

### Database

-   Prisma ORM
-   prod db: postgres (vercel cloud)
    -   dev db: sqlite (local)

### Payments

-   Stripe payment form
    -   If you want to test a payment, find card numbers [here](https://docs.stripe.com/testing)

## Challenges

-   typing things like a Context API provider or a server action
-   learning an entirely new pattern for using the Context API
-   adjusting to TS syntax and useage
-   extending and overwriting type definitions from third parties
-   focusing on always using the most relevant HTML tags, using fewer divs
-   reducing potential for runtime errors
-   keeping as many thing server components as possible
-   wrangling the next-auth aka auth.js lib
-   purging cached data when needed

## Conclusions

A lot of the things I learned about in this project will become my preferred way of doing things. I will definitely continue using Typescript for anything production, tailwind, Next 14+ and all of its magic features, Prisma, the Context pattern used in PetContextProvider,
React-Hook-Form with Zod. I loved being able to customize and modify shadcn/ui's components while keeping their very useful functionality.

I will however be looking for a different auth solution.
