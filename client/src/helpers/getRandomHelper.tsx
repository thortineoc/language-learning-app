export function getRandomInt(max: number | undefined): number {
  if (max) {
    return Math.floor(Math.random() * max);
  } else {
    return 0;
  }
}

export function shuffle(
  array: Array<string> | undefined
): string[] | undefined {
  let currentIndex = array?.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = getRandomInt(currentIndex);
    if (currentIndex && array) {
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }
  return array;
}
