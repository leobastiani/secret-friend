import shuffle = require("lodash.shuffle");
import zip = require("lodash.zip");
import isEqual = require("lodash.isequal");

export default function genSecretFriends(
  userIds: string[],
  { maxTries = 1000 } = {}
): { from: string; to: string }[] {
  for (let i = 0; i < maxTries; i++) {
    const froms = shuffle(userIds);
    if (isEqual(froms, userIds)) {
      continue;
    }
    const tos = [...userIds];
    const tuples = zip(froms, tos) as [string, string][];
    const hasAnyFromEqualToTo = tuples.some(([from, to]) => from === to);
    if (!hasAnyFromEqualToTo) {
      return tuples.map(([from, to]) => ({ from, to }));
    }
  }
  throw genSecretFriends.maxTriesReached;
}

genSecretFriends.maxTriesReached = new Error("Max tries reached");

export const maxTriesReached = genSecretFriends.maxTriesReached;
