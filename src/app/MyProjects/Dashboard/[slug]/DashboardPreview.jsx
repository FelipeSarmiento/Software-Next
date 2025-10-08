import DOMPurify from "dompurify";
import { Disclosure } from '@headlessui/react'
import {IconMenu2} from "@tabler/icons-react";
import {Tabs, TabsList, TabsPanel, TabsTab} from "@mantine/core";

export const DashboardPreview = ({components, onSelectItem, viewport, idUniqueIdentifier}) => {
    const createContent = (section) => {
        const addSelectComponent = (obj) => {
            const newObj = structuredClone(obj)
            return newObj.map((component, index) => {
                if (component !== undefined) {
                    let className = `${component["settings" + viewport.type]?.className} ${(idUniqueIdentifier === component?.idUniqueIdentifier ? " outline outline-offset-2 outline-cyan-400" : "")} select-none`
                    className = className.replaceAll("sm:", "").replaceAll("md:", "").replaceAll("lg:", "").replaceAll("xl:", "").replaceAll("vw", "%").replaceAll("vh", "%");

                    if (idUniqueIdentifier === component?.idUniqueIdentifier) {
                        console.log(idUniqueIdentifier, component?.idUniqueIdentifier)
                    }

                    switch (component.group) {
                        case "element":
                            switch (component.type) {
                                case "text":
                                    return (
                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(component.text) }} onClick={ (event) => {
                                            onSelectItem(event, component)
                                        } }  id={component.idUniqueIdentifier + "preview"}     className={className} key={component.idUniqueIdentifier}>
                                        </p>
                                    )
                                case "span":
                                    return (
                                        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(component.text) }} onClick={ (event) => {
                                            onSelectItem(event, component)
                                        } }  id={component.idUniqueIdentifier + "preview"}     className={className} key={component.idUniqueIdentifier}>
                                        </span>
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
                                case "tabsContainer":
                                    return (
                                        <>
                                            <Tabs key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML}
                                                  defaultValue={
                                                      (component?.defaultValue && component.defaultValue.trim() !== ''
                                                              ? component.defaultValue
                                                              : 'defaultValue'
                                                      ).trim().replaceAll(" ", "")
                                                  } className={className}>
                                                {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                            </Tabs>
                                        </>
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
                        case "tabs":
                            switch (component.type) {
                                case "tabsHeader":
                                    return (
                                        <>
                                            <TabsList key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                                {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                            </TabsList>
                                        </>
                                    )
                                case "tabsHeaderItem":
                                    return (
                                        <>
                                            <TabsTab key={"tab-option-" + component.idUniqueIdentifier} id={"tab-option-" + component?.idHTML} name={"tab-option-" + component?.nameHTML}
                                                     value={
                                                         (component?.text && component.text.trim() !== ''
                                                                 ? component.text
                                                                 : 'tab-content-default-' + index
                                                         ).trim().replaceAll(" ", "")
                                                     } className={className}>{component?.text}</TabsTab>

                                        </>
                                    )
                                case "tabsContent":
                                    return (
                                        <>
                                            <TabsPanel key={"tab-content-" + component.idUniqueIdentifier} id={"tab-content-" + component?.idHTML} name={"tab-content-" + component?.nameHTML}
                                                       value={
                                                           (component?.text && component.text.trim() !== ''
                                                                   ? component.text
                                                                   : 'tab-content-default-' + index
                                                           ).trim().replaceAll(" ", "")
                                                       } className={className}>
                                                {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                            </TabsPanel>
                                        </>
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