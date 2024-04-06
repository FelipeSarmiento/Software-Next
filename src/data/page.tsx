'use server'
import {sql} from "@vercel/postgres";
// import { cookies } from 'next/headers'
import {redirect} from 'next/navigation'
import {encrypt, decrypt, compare} from 'n-krypta';

export const registerUser = async (users) => {
    const {username, password, email, firstName, lastName, phoneNumber} = users
    let passwordEncrypted = encrypt(password, process.env.REACT_APP_SECRET_KEY ?? 'S0FtW@r3N3xT!@#');
    return await sql`INSERT INTO users (first_name, last_name, username, email, phone_number, password) VALUES (${firstName}, ${lastName}, ${username}, ${email}, ${phoneNumber}, ${passwordEncrypted}) RETURNING *`;
}
export const login = async (user: any) => {
    const {password, email} = user
    const {rows} = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (rows.length === 0) {
        throw new Error('User not found')
    }
    else {
        const match = compare(password, rows[0].password, process.env.REACT_APP_SECRET_KEY ?? 'S0FtW@r3N3xT!@#')
        if (match) {
            delete rows[0].password
            return {
                user: rows[0],
                ok: true
            }
        } else {
            throw new Error('Invalid emails or password')
        }
    }
}