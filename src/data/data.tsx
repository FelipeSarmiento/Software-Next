'use server'
import {sql} from "@vercel/postgres";
import {encrypt, decrypt, compare} from 'n-krypta';
import crypto from 'crypto'
import {cookies} from 'next/headers';

/*
*  AUTHENTICATION AND USERS
*  AUTHENTICATION AND USERS
*  AUTHENTICATION AND USERS
*  AUTHENTICATION AND USERS
*  AUTHENTICATION AND USERS
*  AUTHENTICATION AND USERS
*/

export const registerUser = async (users) => {
    const {username, password, email, firstName, lastName, phoneNumber, terms} = users
    const date_created = new Date()
    let passwordEncrypted = encrypt(password, process.env.NEXT_PUBLIC_REACT_APP_SECRET_KEY ?? 'S0FtW@r3N3xT!@#');
    // @ts-ignore
    return await sql`INSERT INTO users (first_name, last_name, username, email, phone_number, password, role, datecreated, dateupdated, terms) VALUES (${firstName}, ${lastName}, ${username}, ${email}, ${phoneNumber}, ${passwordEncrypted}, 'user', ${date_created}, ${date_created}, ${terms}) RETURNING *`;
}
export const login = async (User: any) => {
    const {password, user} = User
    const {rows} = await sql`SELECT * FROM users WHERE email = ${user} OR username = ${user}`;
    let objectResp = {
        user: null as any,
        ok: false as boolean,
        message: '' as string
    }
    if (rows.length === 0) {
        objectResp = {
            user: null,
            ok: false,
            message: 'Invalid email or username'
        }
    } else {
        const match = compare(password, rows[0].password, process.env.NEXT_PUBLIC_REACT_APP_SECRET_KEY ?? 'S0FtW@r3N3xT!@#')
        if (match) {
            delete rows[0].password
            objectResp = {
                user: {
                    ...rows[0],
                    profile_picture: rows[0].profile_picture ? Buffer.from(rows[0].profile_picture, 'base64').toString('utf-8') : null
                },
                ok: true,
                message: ''
            }
        } else {
            objectResp = {
                user: null,
                ok: false,
                message: 'Password is incorrect'
            }
        }
    }
    return objectResp
}

export const updateUser = async (user: any) => {
    let {iduser, first_name, last_name, username, email, phone_number, about, github, profile_picture, position} = user
    // @ts-ignore
    profile_picture = Buffer.from(profile_picture).toString('base64')
    const date_updated = new Date()
    // @ts-ignore
    return await sql`UPDATE users SET first_name = ${first_name}, last_name = ${last_name}, username = ${username}, email = ${email}, phone_number = ${phone_number}, about = ${about}, github = ${ github }, profile_picture = ${ profile_picture }, position = ${ position }, dateupdated = ${ date_updated } WHERE iduser = ${iduser} RETURNING *`;

}

export const logout = async () => {
    cookies().delete('userSession')
}

export const getSession = async () => {
    const session = cookies().get('userSession')?.value;
    if (!session) {
        return null;
    }

    // Verifica si los valores de las variables de entorno están definidos
    const secretKey64 = process.env.NEXT_PUBLIC_REACT_APP_SECRET_KEY64 ?? "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    const secretKey16 = process.env.NEXT_PUBLIC_REACT_APP_SECRET_KEY16 ?? "abcdef9876543210abcdef9876543210";
    if (!secretKey64 || !secretKey16) {
        throw new Error("Las variables de entorno para la clave y el IV no están definidas.");
    }

    // Convierte la clave y el IV de hexadecimal a Buffer
    const key = Buffer.from(secretKey64, 'hex');
    const iv = Buffer.from(secretKey16, 'hex');

    // Desencriptar
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    // @ts-ignore
    let decryptedData: string = decipher.update(Buffer.from(session, 'hex'), 'binary', 'utf-8');
    decryptedData += decipher.final('utf-8');

    return decryptedData ? JSON.parse(decryptedData) : null;
}

export const setSession = async (session: any) => {
    session = {
        ...session,
        profile_picture: undefined
    }

    // @ts-ignore
    const key = Buffer.from(process.env.NEXT_PUBLIC_REACT_APP_SECRET_KEY64 ?? "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef", 'hex');
    // @ts-ignore
    const iv = Buffer.from(process.env.NEXT_PUBLIC_REACT_APP_SECRET_KEY16 ?? "abcdef9876543210abcdef9876543210", 'hex');

// Encriptar
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(JSON.stringify(session), 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    try {
        cookies().set('userSession', encrypted, {
            httpOnly: false,
            secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        })
    } catch (e) {
        console.log(e)
    }
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
    let {rows} = await sql`SELECT * FROM projects WHERE ispublic = true`;

    const enhancedProjects = await Promise.all(rows.map(async (project) => {
        const user = await getUser(project.iduser);
        return {
            ...project,
            user: user
        };
    }));
    return {
        ok: true,
        projects: enhancedProjects
    };
};


export const getProjectsByUser = async () => {

    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to see your projects'
        }
    }

    // @ts-ignore
    const {iduser} = session
    const {rows} = await sql`SELECT * FROM projects WHERE iduser = ${iduser}`;
    return {
        ok: true,
        projects: rows
    }

}

export const getProject = async (project_public_id: string) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to see your projects'
        }
    }
    // @ts-ignore
    const {iduser} = session
    const {rows} = await sql`SELECT * FROM projects WHERE projectpublicid = ${project_public_id} AND iduser = ${iduser}`
    return {
        ok: true,
        project: rows
    }
}
export const getPublicProject = async (project_public_id: string) => {
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
    // @ts-ignore
    const {iduser} = session
    const {project_name, project_description, isPublic, type_project, tags, project_public_id, items, idtemplate} = project
    const date_created = new Date()
    const _items = items ? items : {
        pages:
            {
                index: {
                    sections: [],
                    order: []
                }
            }
    }

    const _idtemplate = idtemplate ? idtemplate : null

    // @ts-ignore
    const resp = await sql`INSERT INTO projects (projectname, projectdescription, isPublic, typeproject, tags, iduser, items, projectpublicid, datecreated, dateupdated, idtemplate) VALUES (${project_name}, ${project_description}, ${isPublic}, ${type_project}, ${tags}, ${iduser}, ${_items}, ${project_public_id}, ${date_created}, ${date_created}, ${_idtemplate}) RETURNING *`
}

export const updateProject = async (project) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to update a project'
        }
    }

    // @ts-ignore
    const {iduser} = session
    const {project_name, project_description, isPublic, type_project, tags, items, idProject} = project
    const date_updated = new Date()
    // @ts-ignore
    return await sql`UPDATE projects SET projectname = ${project_name}, projectdescription = ${project_description}, isPublic = ${isPublic}, typeproject = ${type_project}, tags = ${tags}, items = ${items}, dateupdated = ${date_updated} WHERE idproject = ${idProject} AND iduser = ${iduser} RETURNING *`;
}

export const deleteProject = async (idProject) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to delete a project'
        }
    }

    // @ts-ignore
    const {iduser} = session
    return await sql`DELETE FROM projects WHERE idproject = ${idProject} AND iduser = ${iduser} RETURNING *`;
}

/*
*  TEMPLATES
*  TEMPLATES
*  TEMPLATES
*  TEMPLATES
*  TEMPLATES
*  TEMPLATES
*  TEMPLATES
*/

export const getTemplates = async () => {
    let {rows} = await sql`SELECT * FROM templates WHERE ispublic = true`;

    const enhancedTemplate = await Promise.all(rows.map(async (template) => {
        const user = await getUser(template.iduser);
        return {
            ...template,
            user: user
        };
    }));
    return {
        ok: true,
        templates: enhancedTemplate
    };
};


export const getTemplatesApproved = async () => {

    const {rows} = await sql`SELECT * FROM templates WHERE approved = true AND ispublic = true`;

    return {
        ok: true,
        templates: rows
    }

}
export const getTemplatesByUser = async () => {

    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to see your templates'
        }
    }

    // @ts-ignore
    const {iduser} = session
    const {rows} = await sql`SELECT * FROM templates WHERE iduser = ${iduser}`;
    return {
        ok: true,
        templates: rows
    }

}

export const getTemplate = async (template_public_id: string) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to see your templates'
        }
    }

    // @ts-ignore
    const {iduser} = session
    const {rows} = await sql`SELECT * FROM templates WHERE templatepublicid = ${template_public_id} AND iduser = ${iduser}`
    return {
        ok: true,
        template: rows
    }
}
export const getPublicTemplate = async (template_public_id: string) => {
    const {rows} = await sql`SELECT * FROM templates WHERE templatepublicid = ${template_public_id}`
    return {
        ok: true,
        templates: rows
    }
}

export const createTemplate = async (template) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to create a template'
        }
    }

    // @ts-ignore
    const {iduser} = session
    const {template_name, template_description, isPublic, type_template, tags, template_public_id} = template
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
    const resp = await sql`INSERT INTO templates (templatename, templatedescription, isPublic, typetemplate, tags, iduser, items, templatepublicid, datecreated, dateupdated) VALUES (${template_name}, ${template_description}, ${isPublic}, ${type_template}, ${tags}, ${iduser}, ${items}, ${template_public_id}, ${date_created}, ${date_created}) RETURNING *`
}

export const updateTemplate = async (template) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to update a project'
        }
    }

    // @ts-ignore
    const {iduser} = session
    const {template_name, template_description, isPublic, type_template, tags, items, idTemplate} = template
    const date_updated = new Date()
    // @ts-ignore
    return await sql`UPDATE templates SET templatename = ${template_name}, templatedescription = ${template_description}, isPublic = ${isPublic}, typetemplate = ${type_template}, tags = ${tags}, items = ${items}, dateupdated = ${date_updated} WHERE idtemplate = ${idTemplate} AND iduser = ${iduser} RETURNING *`;
}

export const deleteTemplate = async (idTemplate) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to delete a template'
        }
    }

    // @ts-ignore
    const {iduser} = session
    return await sql`DELETE FROM templates WHERE idtemplate = ${idTemplate} AND iduser = ${iduser} RETURNING *`;
}

/*
*  ANALYTICS
*  ANALYTICS
*  ANALYTICS
*  ANALYTICS
*  ANALYTICS
*  ANALYTICS
*  ANALYTICS
*/

export const getIpDevice = (ip) => {
    const date = new Date();
    return sql`INSERT INTO visitors (ipvisitor, datevisit) VALUES (${ip}, ${date.toString()}) RETURNING *`;
}