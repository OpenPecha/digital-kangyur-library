/**
 * Bilingual UI helpers: prefer the string for the active site language (Tibetan / English),
 * and fall back to the other language when the preferred value is empty or whitespace.
 */

export function hasLocalizedContent(value: string | null | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function pickBilingualText(
  isTibetan: boolean,
  tibetan: string | null | undefined,
  english: string | null | undefined
): string {
  const t = (tibetan ?? '').trim();
  const e = (english ?? '').trim();
  if (isTibetan) {
    return t || e;
  }
  return e || t;
}

/** Same as pickBilingualText plus which script the chosen string is in (for typography classes). */
export function pickBilingualDisplay(
  isTibetan: boolean,
  tibetan: string | null | undefined,
  english: string | null | undefined
): { text: string; scriptIsTibetan: boolean } {
  const t = (tibetan ?? '').trim();
  const e = (english ?? '').trim();
  if (isTibetan) {
    if (t) return { text: t, scriptIsTibetan: true };
    return { text: e, scriptIsTibetan: false };
  }
  if (e) return { text: e, scriptIsTibetan: false };
  return { text: t, scriptIsTibetan: true };
}
