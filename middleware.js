import { NextResponse } from 'next/server'
import {getSession} from "@/data/page";

export function middleware(req) {
    console.log("Pathname: ", req.nextUrl.pathname)
    return getSession().then((session) => {
        if (!session) {
            if (req.nextUrl.pathname === '/Dashboard') {
                return NextResponse.redirect(new URL('/Auth/Login', req.url))
            }
            if (req.nextUrl.pathname === '/MyProjects') {
                return NextResponse.redirect(new URL('/Auth/Login', req.url))
            }
        }
        else {
            if (req.nextUrl.pathname === '/Auth/Login' || req.nextUrl.pathname === '/Auth/Register') {
                return NextResponse.redirect(new URL('/', req.url))
            }
        }
    })
}

export const config = {
    matcher: ['/Dashboard', '/Auth/Login', '/Auth/Register', '/MyProjects', '/MyProjects/Dashboard/:path'],
}
