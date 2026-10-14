export type PageSources = { files: string[]; blocks: { file: string; start: number; end: number }[] };
export function contentFiles(root: string): string[];
export function contentBlocks(root: string, path: string): PageSources["blocks"];
export function pageSources(root: string, path: string): PageSources;
export function hashSources(root: string, sources: PageSources): string;
export function gitSeedDate(root: string, sources: PageSources): string | undefined;
export function todayNewYork(now?: Date): string;
export function readLedger(root: string): Record<string, { date: string; hash: string }>;
export function blockBetween(root: string, file: string, start: RegExp, end: RegExp): PageSources["blocks"][number] | undefined;
export type DeclaredSourceRule = {
  name: string;
  contentFile: string;
  uses: RegExp;
  files?: string[];
  paths?: RegExp;
  blocks(root: string, text: string, path?: string): PageSources["blocks"];
};
export const DECLARED_SOURCES: DeclaredSourceRule[];
export function declaredSources(
  root: string,
  files: string[],
  path?: string,
): { rule: DeclaredSourceRule; files: string[]; blocks: PageSources["blocks"] }[];
