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

    } else {
        throw new Error('Invalid emails or password')
    }
}