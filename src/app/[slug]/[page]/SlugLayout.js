import '@mantine/core/styles.css';
import "../../../settings/assets/globals.css";


export default function SlugLayout({children}) {
    return (
        <>
            {children}
                <script src="https://cdn.tailwindcss.com"></script>
        </>
    );
}
