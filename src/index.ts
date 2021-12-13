import shuffle = require("lodash.shuffle");
import zip = require("lodash.zip");

export default function genSecretFriends<T>(
  userIds: T[],
  { maxTries = 1000 } = {}
): { from: T; to: T }[] {
  for (let i = 0; i < maxTries; i++) {
    const froms = shuffle(userIds);
    const tos = [...froms.slice(1), froms[0]];
    const tuples = zip(froms, tos) as [T, T][];
    const hasAnyFromEqualToTo = tuples.some(([from, to]) => from === to);
    if (!hasAnyFromEqualToTo) {
      return tuples.map(([from, to]) => ({ from, to }));
    }
  }
  throw genSecretFriends.maxTriesReached;
}

genSecretFriends.maxTriesReached = new Error("Max tries reached");

export const maxTriesReached = genSecretFriends.maxTriesReached;
