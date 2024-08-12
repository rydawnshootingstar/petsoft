# PetSoft

This is an app for a fictional pet daycare platform. The purpose is to get more comfortable with the newer features of NextJS (14), introduce myself to Tailwind and Typescript, and try out the popular shadcn library. It's a relatively cutting edge collection of libraries and patterns, all of which were new to me.

## Typescript

Everything is typed.

-   challenge: typing things like a context api provider

## Context API

This project uses the context API for state management.

-   challenge: introduced an entirely new pattern for doing this with NextJS

### Shadcn UI

Built on Radix UI, which is an open source component library. Radix doesn't include styling, just behavior like focusing a modal, closing
modals when the esc key is hit. That stuff is all built in, but shadcn introduces styling by using class-variance-authority. This allows for different variants of components that share core functionality.

> npx shadcn-ui init
>
> > config is in components.json
> > /lib/utils.ts handles the merging of classes in case of conflict (tailwind class order thing)
> > manually installed ui components are installed to /components/ui

I also learned how to style custom reusable components to accept additional classes for styling, keeping that out of the components themselves and leaving it to individual implementations. This is done using the cn() utility function. This combines class names in Tailwind and if there's a conflict such as adding px-5 when the component is styled for its use case, the px-2 that existed previously will be overridden.

### Appropriate html tags

In the past, I relied too heavily on divs. Though I've previously written plain html websites, I fell into the div trap when learning react. This project helped readjust to picking the most relevant html tags like section, main, button, ul/li, and use more React.Fragments aka <>.
