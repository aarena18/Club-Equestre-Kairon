/**
 * Préfixe un chemin interne avec le base path du site (vide en
 * production normale, "/Club-Equestre-Kairon" sur la preview GitHub
 * Pages). Toujours utiliser cette fonction plutôt qu'un href="/xxx" en
 * dur, sinon les liens cassent dès qu'on change d'hébergeur.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}
