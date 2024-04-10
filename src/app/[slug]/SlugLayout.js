import '@mantine/core/styles.css';
import "../../settings/assets/globals.css";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

export const metadata = {
    title: "Software Next - Beta version",
    description: "Software Next: The Next Generation of Software Development",
};

export default function SlugLayout({children}) {
    return (
        <>
            {children}
                <script src="https://cdn.tailwindcss.com"></script>
        </>
    );
}
