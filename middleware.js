import { NextResponse } from 'next/server'
import {getSession} from "@/data/page";

export async function middleware(req) {
    const session = getSession()
    if (!session) {
        return NextResponse.redirect(new URL('/Auth/Login', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/Dashboard',
}
