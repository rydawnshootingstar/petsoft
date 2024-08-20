import { } from 'next-auth';

/*
    Override the default type for JWT in next/auth
*/

declare module "@auth/core/jwt" {
    interface JWT {
        userId: string;
    }
}