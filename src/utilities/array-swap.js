export default function arraySwap(array, i, j) {
  const newArray = [...array];
  newArray[i] = array[j];
  newArray[j] = array[i];
  return newArray;
}
