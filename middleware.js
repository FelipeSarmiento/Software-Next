import { NextResponse } from 'next/server'
import {getSession} from "@/data/page";

export function middleware(req) {
    if (req.nextUrl.pathname === '/MyProjects/Dashboard') {
        return NextResponse.redirect(new URL('/MyProjects/', req.url))
    }
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
    matcher: ['/Auth/Login', '/Auth/Register', '/MyProjects', '/MyProjects/Dashboard', '/MyProjects/Dashboard/:path'],
}
