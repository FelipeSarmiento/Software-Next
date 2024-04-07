'use server'
import {sql} from "@vercel/postgres";
import {encrypt, decrypt, compare} from 'n-krypta';
import { cookies } from 'next/headers';

export const registerUser = async (users) => {
    const {username, password, email, firstName, lastName, phoneNumber} = users
    let passwordEncrypted = encrypt(password, process.env.REACT_APP_SECRET_KEY ?? 'S0FtW@r3N3xT!@#');
    return await sql`INSERT INTO users (first_name, last_name, username, email, phone_number, password) VALUES (${firstName}, ${lastName}, ${username}, ${email}, ${phoneNumber}, ${passwordEncrypted}) RETURNING *`;
}
export const login = async (User: any) => {
    const {password, user} = User
    const {rows} = await sql`SELECT * FROM users WHERE email = ${user} OR username = ${user}`;
    if (rows.length === 0) {
        return {
            user: null,
            ok: false,
            message: 'Invalid email or username'
        }
    }
    else {
        const match = compare(password, rows[0].password, process.env.REACT_APP_SECRET_KEY ?? 'S0FtW@r3N3xT!@#')
        console.log("MATCH: ", match)
        if (match) {
            delete rows[0].password
            return {
                user: rows[0],
                ok: true,
                message: 'Login successful'
            }
        } else {
            return {
                user: null,
                ok: false,
                message: 'Password is incorrect'
            }
        }
    }
}

export const logout = async () => {
    cookies().set('userSession', '', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        path: '/'
    })
}

export const getSession = async () => {
    const session = cookies().get('userSession')?.value
    const decryptedSession = session ? JSON.parse(decrypt(session, process.env.REACT_APP_SECRET_KEY ?? 'S0FtW@r3N3xT!@#').replaceAll('"', '').replaceAll("'", '"')) : null
    return decryptedSession ?? null
}

export const setSession = async (session: any) => {
    const encryptedSession = encrypt('"' + JSON.stringify(session).replaceAll('"', "'").replaceAll("_", "") + '"', process.env.REACT_APP_SECRET_KEY ?? 'S0FtW@r3N3xT!@#')
    cookies().set('userSession', encryptedSession, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    })
}