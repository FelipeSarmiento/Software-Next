import { Disclosure } from '@headlessui/react'
import {IconMenu2} from "@tabler/icons-react";

export const DashboardPreview = ({components, onSelectItem, viewport, idUniqueIdentifier}) => {
    const createContent = (section) => {
        const addSelectComponent = (obj) => {
            const newObj = structuredClone(obj)
            return newObj.map((component, index) => {
                if (component !== undefined) {
                    let className = `${component["settings" + viewport.type]?.className} ${(idUniqueIdentifier === component?.idUniqueIdentifier ? " outline select-none outline-offset-2 outline-cyan-400" : "")}`
                    className = className.replaceAll("sm:", "").replaceAll("md:", "").replaceAll("lg:", "").replaceAll("xl:", "");
                    switch (component.group) {
                        case "element":
                            switch (component.type) {
                                case "text":
                                    return (
                                        <p onClick={ (event) => {
                                            onSelectItem(event, component)
                                        } }  id={component.idUniqueIdentifier + "preview"}     className={className} key={component.idUniqueIdentifier}>
                                            {component.text}
                                        </p>
                                    )
                                case "image":
                                    return (
                                        <img src={ component.src } onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className} key={component.idUniqueIdentifier} />
                                    )
                                default:
                                    return <div key={component.idUniqueIdentifier}>Component not found</div>
                            }
                        case "container":
                            switch (component.type) {
                                case "container":
                                    return (
                                        <container key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </container>
                                    )
                                case "link":
                                    return (
                                        <a key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </a>
                                    )
                                case "main":
                                    return (
                                        <main key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </main>
                                    )
                                case "div":
                                    return (
                                        <div key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </div>
                                    )
                                case "article":
                                    return (
                                        <article key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </article>
                                    )
                                case "section":
                                    return (
                                        <section key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </section>
                                    )
                                case "header":
                                    return (
                                        <header key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </header>
                                    )
                                case "nav":
                                    return (
                                        <nav key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </nav>
                                    )
                                case "aside":
                                    return (
                                        <aside key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </aside>
                                    )
                                case "form":
                                    return (
                                        <form key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </form>
                                    )
                                case "button":
                                    return (
                                        <button key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </button>
                                    )
                                case "footer":
                                    return (
                                        <form key={component.idUniqueIdentifier} onClick={ (event) => { onSelectItem(event, component) } }  id={component.idUniqueIdentifier + "preview"}   className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </form>
                                    )
                                case "menu":
                                    return (
                                        <Disclosure as="div" className={ className } key={component.idUniqueIdentifier}>
                                            <Disclosure.Button>
                                                <IconMenu2/>
                                            </Disclosure.Button>
                                            <Disclosure.Panel>
                                                {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                            </Disclosure.Panel>
                                        </Disclosure>
                                    )
                                default:
                                    return <div key={component.idUniqueIdentifier}>Component not found</div>
                            }
                        default:
                            return <div key={component.idUniqueIdentifier}>Component not found</div>
                    }
                }
            })
        };
        return addSelectComponent(section)
    }

    return (
        <div className="relative min-h-[700px] w-auto">
            {createContent(components?.sections)}
        </div>
    )
}