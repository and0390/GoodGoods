export default function maskName(name: string): string {
  if (!name) return "Anonymous";

  const trimmedName = name.trim();

  // handle one character (example: "A") -> "A***"
  if (trimmedName.length === 1) {
    return `${trimmedName}***`;
  }

  // handle two charaters (example: "Bo") -> "B***o"
  if (trimmedName.length === 2) {
    return `${trimmedName[0]}***${trimmedName[1]}`;
  }

  const firstChar = trimmedName[0];
  const lastChar = trimmedName[trimmedName.length - 1];

  // Apply uppercase to the first and the last initial
  return `${firstChar.toUpperCase()}*****${lastChar.toUpperCase()}`;
}
