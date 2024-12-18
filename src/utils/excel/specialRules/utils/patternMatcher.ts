/**
 * Pattern matching utilities
 */

export const hasPattern = (text: string, patterns: readonly string[]): boolean => {
  const normalizedText = text.toLowerCase();
  return patterns.some(pattern => 
    normalizedText.includes(pattern.toLowerCase())
  );
};

export const matchAnyPattern = (
  text: string | null | undefined,
  patterns: readonly string[]
): boolean => {
  if (!text) return false;
  return hasPattern(text, patterns);
};