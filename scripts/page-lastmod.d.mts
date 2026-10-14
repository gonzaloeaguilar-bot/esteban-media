export type PageSources = { files: string[]; blocks: { file: string; start: number; end: number }[] };
export function contentFiles(root: string): string[];
export function contentBlocks(root: string, path: string): PageSources["blocks"];
export function pageSources(root: string, path: string): PageSources;
export function hashSources(root: string, sources: PageSources): string;
export function gitSeedDate(root: string, sources: PageSources): string | undefined;
export function todayNewYork(now?: Date): string;
export function readLedger(root: string): Record<string, { date: string; hash: string }>;
