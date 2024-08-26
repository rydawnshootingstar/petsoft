/*
        Middleware can run on an edge server
*/

import { auth } from "./lib/auth";

export default auth;

// A list of requests we don't need to be authenticated
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}