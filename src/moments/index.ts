import type { Moment } from '../types';

// Vite's import.meta.glob auto-discovers all JSON files in this directory.
// Adding a new moment = adding a new JSON file here — no code changes needed.
const modules = import.meta.glob<{ default: Moment }>('./*.json', {
  eager: true,
});

const moments: Moment[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.index.localeCompare(b.index));

export function getAllMoments(): Moment[] {
  return moments;
}

export function getMomentById(id: string): Moment | undefined {
  return moments.find((m) => m.id === id);
}
