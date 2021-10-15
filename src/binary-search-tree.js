const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }
  

  root() {
    return this.rootNode;
  }

  add(data) {
    if (!this.rootNode) {
      this.rootNode = new Node(data);
      return;
    }

    let current = this.rootNode;
    while (true) {
      if (current.data == data) {
        return;
      }

      if (data > current.data) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = new Node(data);
          break;
        }
      } else if (data < current.data) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = new Node(data);
          break;
        }
      }
    }
  }

  has(data) {
    console.log(data, this.find(data) !== null);
    return this.find(data) !== null;
  }

  findTree(data) {
    let stack = [];
    let current = this.root();
    while (current) {
      stack.push(current);
      if (current.data == data) {
        return stack;
      }
      if (data > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return null;
  }

  find(data) {
    const tree = this.findTree(data);
    return tree && tree.length ? tree[tree.length - 1] : null;
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
      // если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
      // если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
      // если данные такие как данные корня, удаляем узел
    } else {
      // удаляем узел без потомков (листовой узел (leaf) или крайний)
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // удаляем узел с одним потомком
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // удаляем узел с двумя потомками
      // minNode правого поддерева хранится в новом узле
      let newNode = this.minNode(node.right);
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }


  min() {
    return this.minNode(this.root()).data;
  }

  minNode(current) {
    while (current) {
      if (!current.left) {
        return current;
      }
      current = current.left;
    }
  }

  max() {
    return this.maxNode(this.root()).data;
  }

  maxNode(current) {
    while (current) {
      if (!current.right) {
        return current;
      }
      current = current.right;
    }
  }
}