import { User } from 'next-auth';

/*
    Override the default type for JWT and Session in next/auth
*/

declare module "next-auth" {

    interface User {
        hasAccess: boolean;
        email: string;
    }
    interface Session {
        user: User & {
            id: string;
        }
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        userId: string;
        email: string;
        hasAccess: boolean;
    }
}