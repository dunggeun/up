export type SelectFile = () => Promise<string>;

export type WriteFile = (data: string, filename: string) => Promise<void>;

export type ReadFile = (filepath: string) => Promise<string>;
