// TODO: add more tests
// TODO: add resize operation

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
   * Retrieve the value associated with the key
   *
   * @param {any} key
   * @returns the value associated with the key
   */
  get(key) {
    const index = this._hash(key);

    return this._table[index][1];
  }

  /**
   * Verify if the key exists in the map
   *
   * @param {any} key
   * @returns true if the key exists in the map, false otherwise
   */
  has(key) {
    const index = this._hash(key);

    return this._table[index] !== undefined;
  }

  /**
   * Delete the key from the map
   *
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
    let result = '{\n';

    for (let i = 0; i < this._table.length; i++) {
      if (this._table[i] !== undefined) {
        if (Array.isArray(this._table[i][0])) {
          result += `  ${i}: [${this._table[i][0][0]}: ${this._table[i][0][1]}`;

          for (let j = 1; j < this._table[i].length; j++) {
            result += `, [${this._table[i][j][0]}: ${this._table[i][j][1]}]`;
          }

          result += ']\n';
        } else {
          result += `  ${i}: ${this._table[i][0]}: ${this._table[i][1]}\n`;
        }
      }
    }

    result += '}';

    return result;
  }
}

// TODO: Migrate teste to node:test
const assert = require('node:assert');
const { describe, it } = require('node:test');

describe('Hash Map (Hash Table)', () => {
  it('should set a key-value pair', () => {
    const map = new HashMap();

    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);

    assert.strictEqual(map.size, 3);
  });

  it('should get the value associated with the key', () => {
    const map = new HashMap();

    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);

    assert.strictEqual(map.get('a'), 1);
    assert.strictEqual(map.get('b'), 2);
    assert.strictEqual(map.get('c'), 3);
  });

  it('should verify if the key exists in the map', () => {
    const map = new HashMap();

    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);

    assert.ok(map.has('a'));
    assert.ok(map.has('b'));
    assert.ok(map.has('c'));
  });

  it('should delete the key from the map', () => {
    const map = new HashMap();

    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);

    assert.ok(map.delete('a'));
    assert.ok(map.delete('b'));
    assert.ok(map.delete('c'));
  });

  it('should hash the key', () => {
    const map = new HashMap();

    assert.strictEqual(map._hash('a'), 97);
    assert.strictEqual(map._hash('b'), 98);
    assert.strictEqual(map._hash('c'), 99);
  });

  it('should hash the number key', () => {
    const map = new HashMap();

    assert.strictEqual(map._hash(1), 37);
    assert.strictEqual(map._hash(2), 74);
    assert.strictEqual(map._hash(3), 111);
  });

  it('should hash the object key', () => {
    const map = new HashMap();

    assert.strictEqual(map._hash({ a: 1 }), 73);
    assert.strictEqual(map._hash({ b: 2 }), 111);
    assert.strictEqual(map._hash({ c: 3 }), 12);
  });

  it('should throw an error for invalid key type', () => {
    const map = new HashMap();

    assert.throws(() => map._hash(undefined), {
      message: 'Invalid key type',
    });
  });

  it('should convert the map to string', () => {
    const map = new HashMap();

    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);

    assert.strictEqual(map.toString(), '{\n  1: a: 1\n  2: b: 2\n  3: c: 3\n}');
  });

  it('should convert the map to string with collision', () => {
    const map = new HashMap();

    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);
    map.set('d', 4);
    map.set('e', 5);

    assert.strictEqual(
      map.toString(),
      '{\n  1: a: 1\n  2: b: 2\n  3: c: 3\n  4: [a: 1, [b: 2]]\n  5: d: 4\n  6: e: 5\n}'
    );
  });

  it('should convert the map to string with collision and multiple values', () => {
    const map = new HashMap();

    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);
    map.set('d', 4);
    map.set('e', 5);
    map.set('f', 6);
    map.set('g', 7);

    assert.strictEqual(
      map.toString(),
      '{\n  1: a: 1\n  2: b: 2\n  3: c: 3\n  4: [a: 1, [b: 2]]\n  5: d: 4\n  6: e: 5\n  7: f: 6\n  8: g: 7\n}'
    );
  });
});
