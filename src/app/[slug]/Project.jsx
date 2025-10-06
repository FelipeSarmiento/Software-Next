import {Disclosure} from "@headlessui/react";
import {IconMenu2} from "@tabler/icons-react";
import {MantineProvider, Tabs, TabsList, TabsPanel, TabsTab} from "@mantine/core";

export const Project = ({components, viewport, path}) => {
    const createContent = (section) => {
        const addSelectComponent = (obj) => {
            const newObj = structuredClone(obj)
            return newObj.map((component) => {
                if (component !== undefined) {
                    let className = `${component["settings" + viewport]?.className}`
                    className = className.replaceAll("sm:", "").replaceAll("md:", "").replaceAll("lg:", "").replaceAll("xl:", "");
                    switch (component.group) {
                        case "element":
                            switch (component.type) {
                                case "text":
                                    return (
                                        <p className={className} id={component?.idHTML} name={component?.nameHTML} key={component.idUniqueIdentifier}>
                                            {component.text}
                                        </p>
                                    )
                                case "image":
                                    return (
                                        <img src={component.src} className={className} id={component?.idHTML} name={component?.nameHTML} key={component.idUniqueIdentifier} alt={component.alt}/>
                                    )
                            }
                            break;
                        case "container":
                            switch (component.type) {
                                case "container":
                                    return (
                                        <container key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </container>
                                    )
                                case "tabsContainer":
                                    return (
                                        <>
                                            <Tabs key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                                {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                            </Tabs>
                                        </>
                                    )
                                case "link":
                                    return (
                                        <a key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML}
                                           href={component.href.split("|")[0] === 'internal' ? "/" + path + "/" + component.href.split("|")[1] : component.href.split("|")[1]} target={component.target}
                                           className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </a>
                                    )
                                case "main":
                                    return (
                                        <main key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </main>
                                    )
                                case "div":
                                    return (
                                        <div key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </div>
                                    )
                                case "article":
                                    return (
                                        <article key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </article>
                                    )
                                case "section":
                                    return (
                                        <section key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </section>
                                    )
                                case "header":
                                    return (
                                        <header key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </header>
                                    )
                                case "nav":
                                    return (
                                        <nav key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </nav>
                                    )
                                case "aside":
                                    return (
                                        <aside key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </aside>
                                    )
                                case "form":
                                    return (
                                        <form key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </form>
                                    )
                                case "button":
                                    return (
                                        <button key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </button>
                                    )
                                case "footer":
                                    return (
                                        <form key={component.idUniqueIdentifier} id={component?.idHTML} name={component?.nameHTML} className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </form>
                                    )
                                case "menu":
                                    return (
                                        <Disclosure as="div" className={className} id={component?.idHTML} name={component?.nameHTML} key={component.idUniqueIdentifier}>
                                            <Disclosure.Button>
                                                <IconMenu2/>
                                            </Disclosure.Button>
                                            <Disclosure.Panel>
                                                {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                            </Disclosure.Panel>
                                        </Disclosure>
                                    )
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
                                                       }>
                                                {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                            </TabsPanel>
                                        </>
                                    )
                                default:
                                    return <div key={component.idUniqueIdentifier}>Component not found</div>
                            }
                    }
                }
            })
        };
        return addSelectComponent(section)
    }
    // CSSElements.textContent = CSS;

    return (
        <>
            <MantineProvider>
                {createContent(components?.sections)}
            </MantineProvider>
        </>
    )
}