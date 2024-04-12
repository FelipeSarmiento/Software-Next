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
    return await sql`INSERT INTO users (first_name, last_name, username, email, phone_number, password, role) VALUES (${firstName}, ${lastName}, ${username}, ${email}, ${phoneNumber}, ${passwordEncrypted}, 'user') RETURNING *`;
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

export const deleteProject = async (idProject) => {
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


export const getTemplatesByUser = async () => {

    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to see your templates'
        }
    }
    const {iduser} = session
    const {rows} = await sql`SELECT * FROM templates WHERE iduser = ${iduser}`;
    return {
        ok: true,
        templates: rows
    }

}

export const getTemplate = async (template_public_id : string) => {
    const session = await getSession()
    if (!session) {
        return {
            ok: false,
            message: 'You must be logged in to see your templates'
        }
    }
    const {iduser} = session
    const {rows} = await sql`SELECT * FROM templates WHERE templatepublicid = ${template_public_id} AND iduser = ${iduser}`
    return {
        ok: true,
        template: rows
    }
}
export const getPublicTemplate = async (template_public_id : string) => {
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
    const { iduser } = session
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
    const {iduser} = session
    return await sql`DELETE FROM template WHERE idtemplate = ${idTemplate} AND iduser = ${iduser} RETURNING *`;
}