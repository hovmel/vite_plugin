export interface PluginOptions {
    selector: string;
    options?: IOptions
}

export interface IOptions {
    initializedOptions?: string[];
    onPositionChange?(positions: string[]): void;
    onComplete?(positions: string[]): void;
    onInit?(): void;
}
