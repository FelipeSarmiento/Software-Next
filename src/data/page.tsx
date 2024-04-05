'use server'
import {sql} from "@vercel/postgres";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

var CryptoJS = require("crypto-js");

const bcrypt = require('bcrypt');

export const registerUser = async (users) => {
    const { username, password, email, firstName, lastName, phoneNumber } = users
    let passwordEncrypted = bcrypt.hashSync(password, 10);
    return await sql`INSERT INTO users (first_name, last_name, username, email, phone_number, password) VALUES (${firstName}, ${lastName}, ${username}, ${email}, ${phoneNumber}, ${passwordEncrypted}) RETURNING *`;
}
export const login = async (user: any) => {
    const { password, email } = user
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    const match = bcrypt.compareSync(password, rows[0].password)
    if (match) {

        delete rows[0].password
        saveSession(JSON.stringify(rows[0]))
    } else {
        throw new Error('Invalid emails or password')
    }
}

export const logout = async () => {
    cookies().set('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        path: '/',
    })
}

export const saveSession = async (session: any) => {
    // @ts-ignore
    const encryptedSessionData = CryptoJS.AES.encrypt(session, process.env.REACT_APP_SECRET_KEY) // Encrypt your session data
    // @ts-ignore
    cookies().set('session', encryptedSessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
    })
}

export const getSession = async () => {
    // @ts-ignore
    const encryptedSessionData = cookies().get('session')
    console.log("encryptedSessionData: ", encryptedSessionData)
    // @ts-ignore
    // return CryptoJS.AES.decrypt(encryptedSessionData, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8)
    return 'test'
}