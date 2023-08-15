/**
 *
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  toString() {
    return `${this.value}`;
  }
}

/**
 * Binary Search Tree
 */
class BST {
  constructor() {
    this.root = null;
  }

  /**
   *
   * @param {any} value
   * @returns
   */
  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    let parent = null;
    while (true) {
      parent = current; // save parent
      if (value < current.value) {
        // go left
        current = current.left; // move current to left
        if (!current) {
          // if parent has no left child
          parent.left = newNode; // set parent's left child to new node
          return this;
        }
      } else {
        // go right
        current = current.right; // move current to right
        if (!current) {
          // if parent has no right child
          parent.right = newNode; // set parent's right child to new node
          return this;
        }
      }
    }
  }

  inOrder(node) {
    if (node) {
      this.inOrder(node.left);
      console.log(node.toString());
      this.inOrder(node.right);
    }
  }

  preOrder(node) {
    if (node) {
      console.log(node.toString());
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  postOrder(node) {
    if (node) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.toString());
    }
  }

  getMin(node = this.root) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  /**
   *
   * @param {Node} node
   * @returns
   */
  getMax(node = this.root) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }

  find(value) {
    let current = this.root;

    while (current.value != value) {
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }

      if (!current) {
        return null;
      }
    }

    return current;
  }
}
