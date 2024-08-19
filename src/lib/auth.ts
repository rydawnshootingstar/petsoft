import NextAuth, { NextAuthConfig, Session } from 'next-auth';
import { NextRequest } from 'next/server';
import Credentials from 'next-auth/providers/credentials';
import prisma from './db';
import bcrypt from 'bcryptjs';
/*
    We're using the v5 beta: https://authjs.dev/getting-started/migrating-to-v5

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
                const { email, password } = credentials;
                const user = await prisma.user.findUnique({ where: { email } });
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

        }
    }
} satisfies NextAuthConfig;
// auth is what will expose the user object. import this function wherever we need the logged in user on a server component
export const { auth, signIn, signOut } = NextAuth(config);

