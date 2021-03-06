import genSecretFriends from ".";

it.each(Array.from({ length: 100 }).map((_, i) => [i + 2]))(
  "works with %s users",
  (userNumber) => {
    const users = Array.from({ length: userNumber }).map((_, i) => `u${i + 1}`);
    const tuples = genSecretFriends(users);
    const receivedByUser = Object.fromEntries(
      users.map((user) => {
        return [user, tuples.filter((tuple) => tuple.to === user).length];
      })
    );
    const givesByUser = Object.fromEntries(
      users.map((user) => {
        return [user, tuples.filter((tuple) => tuple.from === user).length];
      })
    );
    expect(givesByUser).toEqual(
      Object.fromEntries(users.map((user) => [user, 1]))
    );
    expect(receivedByUser).toEqual(
      Object.fromEntries(users.map((user) => [user, 1]))
    );
  }
);

it("fails with one user", () => {
  const users = ["u1"];
  expect(() => genSecretFriends(users)).toThrow();
});

it("should start and end with the same person", () => {
  const users = ["u1", "u2", "u3"];
  const tuples = genSecretFriends(users);
  const startWith = tuples[0].from;
  const endWith = tuples[tuples.length - 1].to;
  expect(startWith).toEqual(endWith);
});
