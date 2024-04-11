'use server'
import fs from 'fs'

export default async function setGlobalCSS(items: any, viewportType: string, configCssName: string){
    let currentCSSContent = ''
    try {
        currentCSSContent = fs.readFileSync('src/app/[slug]/globals.css', 'utf8')
    } catch (error) {
        console.error('Error al leer globals.css:', error);
    }

    const createStyles = (section: any) => {
        let CSS = ''
        const addSelectComponent = (obj: any) => {
            const newObj = structuredClone(obj)
            return newObj.map((component : any) => {
                switch (component.group) {
                    case "container":
                    {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                }
                CSS += `.${component.id}{@apply ${component["settings" + viewportType]?.className.replaceAll("sm:", "").replaceAll("md:", "").replaceAll("lg:", "").replaceAll("xl:", "")};}`
                return CSS
            })
        };
        return addSelectComponent(section)
    }

    if (!currentCSSContent.includes(configCssName)){
        const newCSSContent = currentCSSContent + " /* " + configCssName + " */ " + createStyles(items)

        try {
            fs.writeFileSync('src/app/[slug]/globals.css', newCSSContent)
            console.log('CSS actualizado')
        } catch (error) {
            console.error('Error al escribir globals.css:', error);
        }

        try {
            console.log('Reading globals.css', fs.readFileSync('src/app/[slug]/globals.css', 'utf8'))
        } catch (error) {
            console.error('Error al leer globals.css:', error);
        }
    }
}