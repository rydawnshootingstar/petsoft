import NextAuth, { NextAuthConfig, Session } from 'next-auth';
import { NextRequest } from 'next/server';
import Credentials from 'next-auth/providers/credentials';
import prisma from './db';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './serverOnlyUtils';
import { authSchema, TAuth } from './zodSchemas';
/*
    We're using the v5 beta of next/auth: https://authjs.dev/getting-started/migrating-to-v5
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
            const isTryingToAccessApp = request.nextUrl.pathname.includes('app');
            const isTryongToAccessAuth = request.nextUrl.pathname.includes('login') || request.nextUrl.pathname.includes('signup');
            if (isTryingToAccessApp && !isLoggedIn) {
                return false;
            }
            if (isTryongToAccessAuth && isLoggedIn) {
                return Response.redirect(new URL('/app/dashboard', request.nextUrl));     // redirects here must be to an absolute url
            }
            else {
                return true;
            }

        },
        // add additional info to the JWT before it's created
        jwt: ({ token, user }) => {
            if (user) {
                token.userId = user.id;
            }
            return token;
        },
        // add info to be present on the session object on client
        session: ({ session, token }) => {
            session.user.id = token.userId;     // default token type doesn't take in a string called userId. Overridden in /lib/nextAuth.d.ts
            return session;
        }
    }
} satisfies NextAuthConfig;
// auth is what will expose the user object. import this function wherever we need the logged in user on a server component
export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(config);

