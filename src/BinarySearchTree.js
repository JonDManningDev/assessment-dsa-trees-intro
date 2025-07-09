class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // your solution here
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value);
      } else {
        // Recursion
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value);
      } else {
        // Recursion
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    // your solution here

    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      // Recursion
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      // Recursion
      return this.right.find(key);
    } else {
      throw new Error("Key not found.");
    }
  }

  remove(key) {
    // your solution here

    // When you get to the matching key, do this:
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        // Recursion
        return successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
      // Until you find the match, do this:
    } else if (key < this.key && this.left) {
      // Recursion - keep looking
      return this.left.remove(key);
    } else if (key > this.key && this.right) {
      // Recursion - keep looking
      return this.right.remove(key);
    } else {
      throw new Error("Key not found")
    }
  }

  _findMin() {
    // The smallest key will always be to the left
    // If there is no left pointer, this is the smallest already
    if (!this.left) {
      return this;
    } else {
      // Recursion
      return this.left._findMin();
    }
  }

  _replaceWith(node) {
    // Null values for node are allowed
    // You would pass null if you were removing a node with no children, so that it is deleted entirely

    // If the node to be replaced has a parent
    if (this.parent) {
      // If the node to be replaced is its parent's left child
      if (this == this.parent.left) {
        // Make the new node the left child of the replaced node's parent
        this.parent.left = node;
        // If the node to be replaced is its parent's right child
      } else if (this == this.parent.right) {
        // Make the new node the right child of the replaced node's parent
        this.parent.right = node;
      }
      // Follow up by pointing the new node's parent pointer to the replaced node's parent

      // If the passed node is null, don't bother trying to acess its properties (it has none)
      if (node) {
        node.parent = this.parent;
      }
    } else {
      // If the node to be replaced has no parents, it is the root node of the whole tree

        // If we're actually replacing and not simply deleting (ie with a null node)
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
        // If we're deleting a childless node with a null node value
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

}

module.exports = BinarySearchTree;
