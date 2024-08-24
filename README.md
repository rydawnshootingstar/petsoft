# PetSoft

This is an app for a fictional pet daycare platform. The purpose is to get more comfortable with the newer features of NextJS (14), introduce myself to Tailwind and Typescript, and try out the popular shadcn library. It's a relatively cutting edge collection of libraries and patterns, all of which were new to me.

## Typescript

Everything is typed.

-   challenge: typing things like a context api provider

## Context API

This project uses the context API for state management.

-   challenge: introduced an entirely new pattern for doing this with NextJS

### Shadcn-UI

Built on Radix UI, which is an open source component library. Radix doesn't include styling, just behavior like focusing a modal, closing
modals when the esc key is hit. That stuff is all built in, but shadcn-ui introduces styling by using class-variance-authority. This allows for different variants of components that share core functionality.

> npx shadcn-ui init
>
> > config is in components.json
> > /lib/utils.ts handles the merging of classes in case of conflict (tailwind class order thing)
> > manually installed ui components are installed to /components/ui

#### The following components were added from shadcn-ui

-   button
-   dialog
-   label
-   input
-   textarea
-   sonner

I also learned how to style custom reusable components to accept additional classes for styling, keeping that out of the components themselves and leaving it to individual implementations. This is done using the cn() utility function. This combines class names in Tailwind and if there's a conflict such as adding px-5 when the component is styled for its use case, the px-2 that existed previously will be overridden.

### Appropriate html tags

In the past, I relied too heavily on divs. Though I've previously written plain html websites, I fell into the div trap when learning react. This project helped readjust to picking the most relevant html tags like section, main, button, ul/li, and use more React.Fragments aka <>.

## Prisma

-   npx prisma db push : forceful update, may delete data
-   npx prisma migrate dev --name init : db migration

### Prisma Types

Prisma stores schema objects as typescript types. We can use those instead of hardcoding types that correspond to db models.

```
import {Pet} from '@prisma/client';
```

### Sqlite

dev db is sqlite.

##### Seeding Data

We have a seed file to fill our empty db for testing (prisma/seed.ts). To use it, we need a script added to package.json

```
   "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
    },
```

and to run it, we use
`npx prisma db seed`

## Server Actions

These do not increase the size of the JS bundle, will be interactive/functional faster. Everything happens in a single network request too.

## Optimistic UI

The useOptimistic() hook was also researched and implemented in this project.

## React-Hook-Form & Zod validation

React Hook Form with Zod validation on both client and server

## Next-Auth

Next-auth is powering our JWT session tokens. They're http-only and same-site only so they are inaccessible to the client.

## Payments

Stripe payments (through the payment form with redirect) for payments.
