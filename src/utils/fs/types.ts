// Native: string
// Web: File
export type SelectFile = () => Promise<string | File>;

export type WriteFile = (data: string, filename: string) => Promise<void>;

export type ReadFile = (file: string | File) => Promise<string>;
