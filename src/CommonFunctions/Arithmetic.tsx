export function calculateMeanOfArray(array: number[]) {
  return array.reduce((acc, i) => acc + i, 0) / array.length;
}
