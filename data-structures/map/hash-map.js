// todo: add more tests
// todo: add collision handling
// todo: add resize operation

/**
 * Hash Map
 *
 * @class HashMap (Hash Table)
 */
class HashMap {
  constructor() {
    this._capacity = 137;
    this._prime = 37;

    this._data = new Array(this._capacity);
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

    if (this._data[index] !== undefined) {
      console.log('Collision!');
    }

    this.size++;
    this._data[index] = [key, value];
  }

  /**
   * @param {any} key
   * @returns the value associated with the key
   */
  get(key) {
    const index = this._hash(key);

    return this._data[index][1];
  }

  /**
   * @param {any} key
   * @returns true if the key exists in the map, false otherwise
   */
  has(key) {
    const index = this._hash(key);

    return this._data[index] !== undefined;
  }

  /**
   * @param {any} key
   * @returns true if the key was deleted, false otherwise
   */
  delete(key) {
    const index = this._hash(key);

    if (this._data[index] === undefined) {
      return false;
    }

    this.size--;
    this._data[index] = undefined;

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
    return this._data.toString();
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
