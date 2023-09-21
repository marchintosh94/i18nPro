export const objectKeysToLower = <T extends object>(obj: T): T => {
  const mappedObject: [string, any][] = Object.entries(obj).map(
    ([key, val]) => [key.toLowerCase(), val]
  );
  const sortedKeys = new Map([...mappedObject]);
  return Object.fromEntries(sortedKeys) as T;
};

export const binarySearch = (
  arr: (string | number)[],
  target: string | number
): string | number | undefined => {
  let left = 0;
  let right = arr.length - 1;
  const searchValue = target.toString().toLowerCase();

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const current = arr[mid]!.toString().toLowerCase();
    if (current === searchValue) {
      return arr[mid]; // Found the target, return its index
    } else if (current < searchValue) {
      left = mid + 1; // Continue searching on the right side
    } else {
      right = mid - 1; // Continue searching on the left side
    }
  }

  return undefined; // Target not found
};
