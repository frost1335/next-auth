import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRedirectRoutes,
    authRoutes,
    publicRoutes
} from '@/routes'
const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isAuthRedirect = authRedirectRoutes.includes(nextUrl.pathname)

    // auth redirect to login page to fix bug related to provider failure redirect
    if (isAuthRedirect) {
        return Response.redirect(new URL(`/auth/login?error=${nextUrl.searchParams.get('error')}`, nextUrl))
    }

    if (isApiAuthRoute) {
        return
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname
        if (nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        const encodeCallbackUrl = encodeURIComponent(callbackUrl)

        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodeCallbackUrl}`, nextUrl))
    }

    return
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}