class List {
  constructor(...args) {
    if (typeof args[0] === 'number') {
      this.data = new Array(args[0]);
      this.size = 0;
      return;
    }

    if (Array.isArray(args[0])) {
      this.data = args[0];
      this.size = args[0].length;
      return;
    }

    this.data = new Array(10);
    this.size = 0;
  }

  /**
   * Add value to the end of the list
   *
   * Average case: O(1)
   * Worst case: O(n) because of the resize operation
   *
   * @param {any} value value to add to the list
   */
  add(value) {
    if (this.size === this.data.length) {
      this._resize();
    }
    this.data[this.size++] = value; // increment list size and attribute value to the last position
  }

  /**
   * Remove the value at the given index
   *
   * Average case: O(n) because of the shift operation
   * Worst case: O(n) because of the shift operation
   *
   * @param {number} index
   * @returns the value removed from the list
   */
  remove(index) {
    const value = this.data[index];
    this._shiftLeft(index);
    this.size--;
    return value;
  }

  /**
   * Get the value at the given index
   *
   * @param {number} index
   * @returns the value at the given index
   */
  get(index) {
    return this.data[index];
  }

  /**
   * Remove the last value of the list and return it
   *
   * @returns the last value of the list
   */
  pop() {
    return this.remove(this.size - 1);
  }

  /**
   * Remove the first value of the list and return it
   *
   * @returns the first value of the list
   */
  popleft() {
    return this.remove(0);
  }

  /**
   * @returns true if the list is empty, false otherwise
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Shift all elements to the right of the given index to the left by one
   *
   * Time Complexity:
   *
   * - Average case: O(n)
   * -   Worst case: O(n)
   *
   * @param {number} index index to start shifting
   */
  _shiftLeft(index) {
    for (let i = index; i < this.size; i++) {
      this.data[i] = this.data[i + 1];
    }
  }

  /**
   * Resize the list by doubling its capacity
   *
   * Time Complexity:
   * - Average case: O(n)
   * -   Worst case: O(n)
   */
  _resize() {
    const newData = new Array(this.data.length * 2);

    for (let i = 0; i < this.data.length; i++) {
      newData[i] = this.data[i];
    }

    this.data = newData;
  }

  /**
   * this method is called when the list is used in a for...of loop
   *
   * @returns an iterator for the list
   */
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index >= this.size) {
          return { done: true };
        }

        return { value: this.data[index++], done: false };
      },
    };
  }

  toString() {
    return this.data.slice(0, this.size);
  }

  /**
   * Verify if the list is equals to the given value
   *
   * @param {List | Array} value list to compare with the list
   * @returns true if the list is equals to the given list, false otherwise
   */
  isEquals(value) {
    if (value instanceof List) {
      if (this.size !== value.size) {
        return false;
      }

      for (let i = 0; i < this.size; i++) {
        if (this.data[i] !== value.data[i]) {
          return false;
        }
      }
    }

    if (Array.isArray(value)) {
      if (this.size !== value.length) {
        return false;
      }

      for (let i = 0; i < this.size; i++) {
        if (this.data[i] !== value[i]) {
          return false;
        }
      }
    }

    return true;
  }
}

process.stdout.write('\n\tTesting Array-based List\n\n');

const list = new List(5);

process.stdout.write('1. Testing the isEmpty method');
console.assert(list.isEmpty(), 'list should be empty', {
  size: list.size,
  isEmptyReturn: list.isEmpty(),
});
console.assert(list.size === 0, 'list size should be 0', {
  size: list.size,
  isEmptyReturn: list.isEmpty(),
});
process.stdout.write('\t✅ Tests finished\n');

process.stdout.write('2. Testing the add method');
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

console.assert(list.size === 5, 'list size should be 5');
console.assert(list.isEquals([1, 2, 3, 4, 5]), 'list should be [1,2,3,4,5]', {
  list: list.toString(),
  data: list.data,
  isEqualsReturn: list.isEquals([1, 2, 3, 4, 5]),
});
process.stdout.write('\t✅ Tests finished\n');

process.stdout.write('3. Testing the remove method');
list.remove(2);

console.assert(list.size === 4, 'list size should be 4');
console.assert(list.isEquals([1, 2, 4, 5]), 'list should be [1,2,4,5]', {
  list: list.toString(),
});
process.stdout.write('\t✅ Tests finished\n');

process.stdout.write('4. Testing the resize operation');
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

// testing if the list is resized correctly
console.assert(list.size === 9, 'list size should be 9');
process.stdout.write('\t✅ Tests finished\n');
