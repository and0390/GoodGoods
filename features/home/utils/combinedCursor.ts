type CombinedCursor = {
  personalizedCursor: string | null;
  popularCursor: string | null;
};

export function encodeCursor(c: CombinedCursor) {
  return Buffer.from(JSON.stringify(c)).toString("base64");
}
export function decodeCursor(s: string | null): CombinedCursor {
  if (!s) return { personalizedCursor: null, popularCursor: null };
  return JSON.parse(Buffer.from(s, "base64").toString());
}
