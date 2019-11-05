interface ServerApi {
    loadSource(fn: Function): void;
}
export declare type Server = (api: ServerApi) => void;
export {};
