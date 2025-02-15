import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const progressOptions = { color: '#4B5563' }; // Configuration du progress bar

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        return await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        );
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: progressOptions,
});
