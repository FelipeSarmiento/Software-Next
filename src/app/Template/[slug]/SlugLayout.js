import '@mantine/core/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css'


export default function SlugLayout({children}) {
    return (
        <>
            {children}
                <script src="https://cdn.tailwindcss.com"></script>
        </>
    );
}
