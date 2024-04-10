'use server'
import {sql} from "@vercel/postgres";
import {encrypt, decrypt, compare} from 'n-krypta';
import { cookies } from 'next/headers';

/*
*  AUTHENTICATION AND USERS
*  AUTHENTICATION AND USERS
*  AUTHENTICATION AND USERS
*  AUTHENTICATION AND USERS
*  AUTHENTICATION AND USERS
*  AUTHENTICATION AND USERS
*/

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
        if (match) {
            delete rows[0].password
            return {
                user: rows[0],
                ok: true,
                message: ''
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

export const getUser = async (idUser) => {
    const {rows} = await sql`SELECT * FROM users WHERE idUser = ${idUser}`;
    return rows[0]
}

/*
*  PROJECTS
*  PROJECTS
*  PROJECTS
*  PROJECTS
*  PROJECTS
*  PROJECTS
*/

export const getProjects = async () => {
    const {rows} = await sql`SELECT * FROM projects WHERE ispublic = true`;
    return {
        ok: true,
        projects: rows
    }

}

export const getProjectsByUser = async () => {

    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to see your projects'
        }
    }
    const {iduser} = session
    const {rows} = await sql`SELECT * FROM projects WHERE iduser = ${iduser}`;
    return {
        ok: true,
        projects: rows
    }

}

export const getProject = async (project_public_id : string) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to see your projects'
        }
    }
    const {iduser} = session
    const {rows} = await sql`SELECT * FROM projects WHERE projectpublicid = ${project_public_id} AND iduser = ${iduser}`
    return {
        ok: true,
        project: rows
    }
}
export const getPublicProject = async (project_public_id : string) => {
    const {rows} = await sql`SELECT * FROM projects WHERE projectpublicid = ${project_public_id}`
    return {
        ok: true,
        project: rows
    }
}

export const createProject = async (project) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to create a project'
        }
    }
    const { iduser } = session
    const {project_name, project_description, isPublic, type_project, tags, project_public_id} = project
    const date_created = new Date()
    const items = {
        pages:
            {
                index: {
                    sections: [],
                    order: []
                }
            }
    }
    
    // @ts-ignore
    const resp = await sql`INSERT INTO projects (projectname, projectdescription, isPublic, typeproject, tags, iduser, items, projectpublicid, datecreated, dateupdated) VALUES (${project_name}, ${project_description}, ${isPublic}, ${type_project}, ${tags}, ${iduser}, ${items}, ${project_public_id}, ${date_created}, ${date_created}) RETURNING *`
    }

export const updateProject = async (project) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to update a project'
        }
    }
    const {iduser} = session
    const {project_name, project_description, isPublic, type_project, tags, items, idProject} = project
    const date_updated = new Date()
    // @ts-ignore
    return await sql`UPDATE projects SET projectname = ${project_name}, projectdescription = ${project_description}, isPublic = ${isPublic}, typeproject = ${type_project}, tags = ${tags}, items = ${items}, dateupdated = ${date_updated} WHERE idproject = ${idProject} AND iduser = ${iduser} RETURNING *`;
}

export const deleteProyect = async (idProject) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to delete a project'
        }
    }
    const {iduser} = session
    return await sql`DELETE FROM projects WHERE idproject = ${idProject} AND iduser = ${iduser} RETURNING *`;
}