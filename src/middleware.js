'use server'
import {NextResponse} from 'next/server'
import {getSession, getIpDevice} from "@/data/data";
import {cookies} from "next/headers";

export function middleware(req) {

    getIpDevice(req.ip)

    const session = cookies().get('userSession')?.value;

    if (req.nextUrl.pathname === '/MyProjects/Dashboard') {
        return NextResponse.redirect(new URL('/MyProjects/', req.url))
    }
    if (req.nextUrl.pathname === '/MyTemplates/Dashboard') {
        return NextResponse.redirect(new URL('/MyTemplates/', req.url))
    }
    if (!session) {
        if (req.nextUrl.pathname.includes('/MyProjects/Dashboard/')) {
            return NextResponse.redirect(new URL('/Auth/Login', req.url))
        }
        if (req.nextUrl.pathname.includes('/MyProjects')) {
            return NextResponse.redirect(new URL('/Auth/Login', req.url))
        }
        if (req.nextUrl.pathname.includes('/MyTemplates/Dashboard/')) {
            return NextResponse.redirect(new URL('/Auth/Login', req.url))
        }
        if (req.nextUrl.pathname.includes('/MyTemplates')) {
            return NextResponse.redirect(new URL('/Auth/Login', req.url))
        }
        if (req.nextUrl.pathname.includes('/MyProfile')) {
            return NextResponse.redirect(new URL('/Auth/Login', req.url))
        }
    } else {
        if (req.nextUrl.pathname.includes('/Auth/Login') || req.nextUrl.pathname.includes('/Auth/Register')) {
            return NextResponse.redirect(new URL('/MyProjects', req.url))
        }
    }
}

export const config = {
    matcher: ['/Auth/Login', '/Auth/Register', '/MyProjects', '/', '/MyProfile', '/MyTemplates', '/MyProjects/Dashboard', '/MyProjects/Dashboard/:path*', '/MyTemplates/Dashboard', '/MyTemplates/Dashboard/:path*'],
    api: {
        bodyParser: {
            sizeLimit: '40mb',
        },
    },
}
