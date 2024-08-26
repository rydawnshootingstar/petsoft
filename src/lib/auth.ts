import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './serverOnlyUtils';
import { authSchema } from './zodSchemas';

/*
    We're using the v5 beta of next/auth: https://authjs.dev/getting-started/migrating-to-v5

    When next-auth's signIn does a redirect, it's actually throwing an error. We deal with this in actions.ts

    ISSUE: in the authorized callback, our redirects "work". The user is redirected to /app/dashboard for example, but the router
    doesn't contain the correct url. It still thinks it's /login or /signup. This is fixed within PetList.tsx for dashboard
    and the payment page for payments. 
*/

const config = {
    pages: { signIn: '/login', },
    session: {
        maxAge: 30 * 24 * 60 * 60,      // 30 days (the default)
        strategy: "jwt"
    },
    providers: [
        Credentials({
            // this runs on every login attempt
            authorize: async (credentials) => {
                // validation - necessary to do here instead of in actions.ts to fix typescript errors
                const validatedAuthData = authSchema.safeParse(credentials);
                if (!validatedAuthData.success) {
                    return null;
                }

                const { email, password } = validatedAuthData.data;

                const user = await getUserByEmail(email);
                if (!user) {
                    console.log("invalid email");
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
                if (!passwordMatch) {
                    console.log("invalid credentials");
                    return null;
                }

                return user;    // by default only email, name, image, id are exposed by returning this user object
            }
        })],
    callbacks: {
        // this runs on every request that matches our middleware pattern
        authorized: ({ auth, request }) => {
            const isLoggedIn = Boolean(auth?.user);
            const hasAccess = Boolean(auth?.user.hasAccess);
            const isTryingToAccessApp = request.nextUrl.pathname.includes('app');
            const isTryingToAccessAuth = request.nextUrl.pathname.includes('login') || request.nextUrl.pathname.includes('signup');
            const redirectUrlForDashboard = new URL('/app/dashboard', request.nextUrl);
            const redirectUrlForPayment = new URL('/payment', request.nextUrl);

            if (isTryingToAccessApp && !isLoggedIn) {
                return false;
            }
            if (isTryingToAccessApp && isLoggedIn && !hasAccess) {
                return Response.redirect(redirectUrlForPayment);        // redirects here must be to an absolute url
            }
            if (isTryingToAccessAuth && isLoggedIn && !hasAccess) {
                return Response.redirect(redirectUrlForPayment);        // redirects here must be to an absolute url
            }
            if (isTryingToAccessAuth && isLoggedIn && hasAccess) {
                return Response.redirect(redirectUrlForDashboard);      // redirects here must be to an absolute url
            }

            else {
                return true;
            }

        },
        // add additional info to the JWT before it's created
        jwt: async ({ token, user, trigger }) => {
            if (user) {
                token.userId = user.id!;
                token.hasAccess = user.hasAccess;
                token.email = user.email!;
            }
            if (trigger === 'update') {
                const userFromDb = await getUserByEmail(token.email);
                if (userFromDb) {
                    token.hasAccess = userFromDb.hasAccess;
                }
            }
            return token;
        },
        // add info to be present on the session object on client
        session: ({ session, token }) => {
            session.user.id = token.userId;             // default token type doesn't take in a string called userId. Overridden in /lib/nextAuth.d.ts
            session.user.hasAccess = token.hasAccess;   // default token type doesn't take in a bool called hasAccess. Overridden in /lib/nextAuth.d.ts
            return session;
        }
    }
} satisfies NextAuthConfig;
// auth is what will expose the user object. import this function wherever we need the logged in user on a server component
export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(config);

