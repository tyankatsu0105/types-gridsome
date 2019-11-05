interface ServerApi {
  loadSource(fn: Function): void;
}

export type Server = (api: ServerApi) => void;