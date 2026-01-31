

export const getAverage = (num: number, base: number): number => {
  const avg = ((num / 100) * base ) * 100;

  return avg ?? 0;
}