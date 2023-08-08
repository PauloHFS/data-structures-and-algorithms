// todo: add more tests
// todo: add resize operation

// todo: add collision handling

/**
 * Hash Map (Hash Table) using separate chaining
 *
 * @class HashMap (Hash Table)
 */
class HashMap {
  /**
   * @constructor
   */
  constructor() {
    this._capacity = 137;
    this._prime = 37;

    this._table = new Array(this._capacity); // The list will only be added when there is a collision to avoid wasting memory and time
    this.size = 0;
  }

  /**
   * Set a key-value pair
   *
   * @param {any} key
   * @param {any} value
   */
  set(key, value) {
    const index = this._hash(key);

    console.log(`--> ${key} hashed to ${index}`);

    this.size++;

    // Collision handling
    if (this._table[index] !== undefined) {
      if (this._table[index][0] === key) {
        this._table[index][1] = value;
        return;
      }

      const previous_value = this._table[index];

      // this._table[index] = [previous_value, [key, value]];
      this._table[index] = [previous_value];

      let i = 0;

      while (i < this._table[index].length) {
        if (this._table[index][i][0] === key) {
          this._table[index][i][1] = value;
          return;
        }
        i++;
      }

      this._table[index].push([key, value]);

      return;
    }

    this._table[index] = [key, value];
  }

  /**
   * @param {any} key
   * @returns the value associated with the key
   */
  get(key) {
    const index = this._hash(key);

    return this._table[index][1];
  }

  /**
   * @param {any} key
   * @returns true if the key exists in the map, false otherwise
   */
  has(key) {
    const index = this._hash(key);

    return this._table[index] !== undefined;
  }

  /**
   * @param {any} key
   * @returns true if the key was deleted, false otherwise
   */
  delete(key) {
    const index = this._hash(key);

    if (this._table[index] === undefined) {
      return false;
    }

    this.size--;
    this._table[index] = undefined;

    return true;
  }

  /**
   * Hash function for the map
   *
   * This hash function uses the Horner's method
   *
   * @param {any} key
   * @returns the hash value of the key
   */
  _hash(key) {
    if (typeof key === 'number') {
      return (this._prime * key) % this._capacity;
    }

    if (typeof key === 'string') {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash = this._prime * hash + key.charCodeAt(i);
      }
      return hash % this._capacity;
    }

    if (typeof key === 'object') {
      return this._hash(JSON.stringify(key));
    }

    throw new Error('Invalid key type');
  }

  toString() {
    const getText = (hash, value) => {
      if (value.length > 2) {
        return `  (${hash}): [${value
          .map((key, value) => `${key}: ${value}`)
          .join(', ')}]`;
      }

      return `  ${value[0]} (${hash}): ${value[1]}`;
    };

    let str = '{\n';

    for (let i = 0; i < this._table.length; i++) {
      if (this._table[i] !== undefined) {
        str += getText(i, this._table[i]) + '\n';
        // str += `  ${this._table[i][0]} (${i}): ${getText(this._table[i])}\n`;
      }
    }

    str += '}';
    return str;
  }
}

process.stdout.write('\tHash Map (Hash Table) Testing\n');

const map = new HashMap();

process.stdout.write('1. Testing set method\t');

map.set('a', 1);
map.set('b', 2);
map.set('c', 3);

console.assert(map.size === 3, 'map size should be 3', {
  size: map.size,
  data: map.data,
});
process.stdout.write('\t✅ Tests finished\n');

process.stdout.write('2. Testing get method\t');

console.assert(map.get('a') === 1, 'map.get("a") should be 1', {
  get: map.get('a'),
});

console.assert(map.get('b') === 2, 'map.get("b") should be 2', {
  get: map.get('b'),
});

console.assert(map.get('c') === 3, 'map.get("c") should be 3', {
  get: map.get('c'),
});

process.stdout.write('\t✅ Tests finished\n');

console.log('\n\n');

const m = new HashMap();

m.set('David', 1);
m.set('Clayton', 1);
m.set('Raymond', 2);
m.set('Raymond', '22');

console.log(m.toString());

console.log(m._table);
