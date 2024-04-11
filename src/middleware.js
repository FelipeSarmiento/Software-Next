'use server'
import { NextResponse } from 'next/server'
import {getSession} from "@/data/page";

export function middleware(req) {
    console.log("req: ", req)
    if (req.nextUrl.pathname === '/MyProjects/Dashboard') {
        return NextResponse.redirect(new URL('/MyProjects/', req.url))
    }
    return getSession().then((session) => {
        if (!session) {
            if (req.nextUrl.pathname.includes('/MyProjects/Dashboard/')) {
                return NextResponse.redirect(new URL('/Auth/Login', req.url))
            }
            if (req.nextUrl.pathname.includes('/MyProjects')) {
                return NextResponse.redirect(new URL('/Auth/Login', req.url))
            }
        }
        else {
            if (req.nextUrl.pathname.includes('/Auth/Login') || req.nextUrl.pathname.includes('/Auth/Register')) {
                return NextResponse.redirect(new URL('/MyProjects', req.url))
            }
        }
    })
}

export const config = {
    matcher: ['/Auth/Login', '/Auth/Register', '/MyProjects', '/MyProjects/Dashboard', '/MyProjects/Dashboard/:path*'],
}
