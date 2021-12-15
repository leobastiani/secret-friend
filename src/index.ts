function shuffle<T>(array: T[]): T[] {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function zip<T, U>(a: T[], b: U[]): Array<[T, U]> {
  return a.map((x, i) => [x, b[i]]);
}

export default function genSecretFriends<T>(
  userIds: T[],
  { maxTries = 1000 } = {}
): Array<{ from: T; to: T }> {
  for (let i = 0; i < maxTries; i++) {
    const froms = shuffle(userIds);
    const tos = [...froms.slice(1), froms[0]];
    const tuples = zip(froms, tos);
    const hasAnyFromEqualToTo = tuples.some(([from, to]) => from === to);
    if (!hasAnyFromEqualToTo) {
      return tuples.map(([from, to]) => ({ from, to }));
    }
  }
  throw genSecretFriends.maxTriesReached;
}

genSecretFriends.maxTriesReached = new Error("Max tries reached");

export const maxTriesReached = genSecretFriends.maxTriesReached;
