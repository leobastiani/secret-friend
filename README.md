# secret-friend

## Usage example

Let's suppose you have friends: Arthur, Bob, Clara

```javascript
const genSecretFriends = require("secret-friend");

const friends = ["Arthur", "Bob", "Clara"];
const tuples = genSecretFriends(friends);

console.log(tuples);
/**
 * [
 *   { from: 'Arthur', to: 'Bob' }, // Arthur gives a gift to Bob
 *   { from: 'Bob', to: 'Carla' }, // Bob gives a gift to Carla
 *   { from: 'Carla', to: 'Arthur' }, // Carla gives a gift to Arthur
 * ]
 */
```
