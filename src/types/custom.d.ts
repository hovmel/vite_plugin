import {PluginOptions} from "./types.ts";

declare global {
    interface Window {
        DAMAGE_SELECTOR_API?: {
            init: (options: PluginOptions) => void;
        };
    }
}
