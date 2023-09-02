import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import {PluginOptions} from "./types/types.ts";

const initPlugin = (options: PluginOptions) => {
    ReactDOM.render(
        <ErrorBoundary>
            <App options={options.options} />
        </ErrorBoundary>,
        document.querySelector(options.selector)
    );
};

interface DamageSelectorAPI {
    init: (options: PluginOptions) => void;
}

if (import.meta.env.MODE === 'development') {
    const renderElement = document.getElementById('root');
    createRoot(renderElement as HTMLElement).render(
        <App options={{}} />
    );
} else {
    window.DAMAGE_SELECTOR_API = {
        init: initPlugin,
    } as DamageSelectorAPI;
}
