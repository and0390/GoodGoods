export default function formatCount(count: number): string {
  if (count < 1_000) return `${count}`;

  if (count < 1_000_000) {
    const value = Math.floor((count / 1000) * 10) / 10;
    return `${value.toString().replace(/\.0$/, "")}k`;
  }

  if (count < 1_000_000_000) {
    const value = Math.floor((count / 1_000_000) * 10) / 10;
    return `${value.toString().replace(/\.0$/, "")}M`;
  }

  const value = Math.floor((count / 1_000_000_000) * 10) / 10;
  return `${value.toString().replace(/\.0$/, "")}B`;
}
