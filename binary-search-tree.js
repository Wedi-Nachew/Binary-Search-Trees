// a Node factory that returns the value and left & right attributes
const Node = (value, left = null, right = null) => {
    return { value, left, right };
};

function buildTree(array, start = 0, end = array.length - 1) {
    array = Array.from(new Set(array.sort((a, b) => (a > b ? 1 : -1))));
    if (start > end) {
        return null;
    }
    let mid = Number.parseInt((start + end) / 2);
    const node = Node(array[mid]);
    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);

    return node;
}

const Tree = (array) => {
    let root = buildTree(array);
    // insert the value passed to it to the tree
    const insert = (newValue, tree = root) => {
        if (newValue === tree.value) {
            return false;
        } else if (tree.value > newValue) {
            if (tree.left === null) {
                return (tree.left = Node(newValue));
            } else {
                return insert(newValue, tree.left);
            }
        } else if (tree.value < newValue) {
            if (tree.right === null) {
                return (tree.right = Node(newValue));
            } else {
                return insert(newValue, tree.right);
            }
        }
    };
    // removes the value passed to it from the tree
    const remove = (valueToRemove, tree = root) => {
        if (tree.value === valueToRemove) {
            let rightItem = tree.right;
            while (rightItem.left) {
                rightItem = rightItem.left;
            }
            tree.value = rightItem.value;
            return (tree.right.left = rightItem.right);
        } else if (tree.left.value === valueToRemove) {
            if (tree.left.left === null && tree.left.right === null) {
                return (tree.left = null);
            } else if (tree.left.left !== null && tree.left.right !== null) {
                let rightItem = tree.left.right;
                while (rightItem.left) {
                    rightItem = rightItem.left;
                }
                tree.left.value = rightItem.value;
                return (tree.left.right = rightItem.right);
            } else if (tree.left.left !== null || tree.left.right !== null) {
                return (tree.left = tree.left.left ?? tree.left.right);
            }
        } else if (tree.right.value === valueToRemove) {
            if (tree.right.left === null && tree.right.right === null) {
                return (tree.right = null);
            } else if (tree.right.left !== null && tree.right.right !== null) {
                let rightItem = tree.right.right;
                while (rightItem.left) {
                    rightItem = rightItem.left;
                }
                tree.right.value = rightItem.value;
                return (tree.right.right.left = rightItem.right);
            } else if (tree.right.left !== null || tree.right.right !== null) {
                return (tree.left = tree.right.left ?? tree.right.right);
            }
        } else if (tree.value < valueToRemove) {
            return remove(valueToRemove, tree.right);
        } else if (tree.value > valueToRemove) {
            return remove(valueToRemove, tree.left);
        }

        return null;
    };
    // returns the node with given value
    const find = (valueToBeSearched, tree = root) => {
        if (valueToBeSearched === tree.value) {
            return tree;
        } else if (valueToBeSearched > tree.value) {
            return find(valueToBeSearched, tree.right);
        } else if (valueToBeSearched < tree.value) {
            return find(valueToBeSearched, tree.left);
        }
        return null;
    };
    // traverses the tree in breadth-first-search and provide each node
    // to the function passed to it and if no function is passed to it it returns an array of values
    const levelOrder = (passedFunction = null, tree = root, arr = []) => {
        if (tree === null) {
            return null;
        }
        let BFS = [];
        arr.push(tree);
        while (arr.length) {
            let current = arr.shift();
            passedFunction ? passedFunction(current) : BFS.push(current.value);
            if (current.left !== null) arr.push(current.left);
            if (current.right !== null) arr.push(current.right);
        }

        return passedFunction ?? BFS;
    };
    // traverses the tree in deepth-first-search and provide each node
    // to the function passed to it in preorder and if no function is passed
    // to it it returns an array of values in preOrder
    const preOrder = (passedFunction = null, tree = root, DFS = []) => {
        if (tree === null) return null;
        passedFunction ? passedFunction(tree) : DFS.push(tree.value);
        preOrder(passedFunction, tree.left, DFS);
        preOrder(passedFunction, tree.right, DFS);

        return DFS;
    };
    // traverses the tree in deepth-first-search and provide each node
    // to the function passed to it in postorder and if no function is passed
    // to it it returns an array of values in postOrder
    const inOrder = (passedFunction = null, tree = root, DFS = []) => {
        if (tree === null) return null;
        inOrder(passedFunction, tree.left, DFS);
        passedFunction ? passedFunction(tree) : DFS.push(tree.value);
        inOrder(passedFunction, tree.right, DFS);

        return DFS;
    };
    // traverses the tree in deepth-first-search and provide each node
    // to the function passed to it in postorder and if no function is passed
    // to it it returns an array of values in postOrder
    const postOrder = (passedFunction = null, tree = root, DFS = []) => {
        if (tree === null) return null;
        postOrder(passedFunction, tree.left, DFS);
        postOrder(passedFunction, tree.right, DFS);
        passedFunction ? passedFunction(tree) : DFS.push(tree.value);

        return DFS;
    };

    // accepts a value and returns the number of edges in path from a given node to the tree’s root node.
    const depth = (node, tree = root, count = 0) => {
        if (tree === null) {
            return null;
        } else if (node.value > tree.value) {
            count++;
            return depth(node, tree.right, count);
        } else if (node.value < tree.value) {
            count++;
            return depth(node, tree.left, count);
        }

        return count;
    };
    // accepts a node and returns the number as the number of edges in longest path from a given node to a leaf node.
    const height = (node) => {
        if (node === null) {
            return -1;
        }
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    };
    // checks if the tree is balanced
    const isBalanced = (tree) => {
        if (tree === null) {
            return true;
        }
        const leftHeight = height(tree.left);
        const rightHeight = height(tree.right);
        if (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            isBalanced(tree.left) &&
            isBalanced(tree.right)
        ) {
            return true;
        }

        return false;
    };
    const reBalance = (tree) => {
        tree.root = buildTree(inOrder(null, tree));
    };
    return {
        root,
        insert,
        remove,
        find,
        levelOrder,
        preOrder,
        inOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        reBalance,
    };
};
// let tree = Tree([10, 43, 59, 9, 45, 87, 62, 25, 92, 11, 84, 55]);
let tree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
tree.insert(100);
tree.insert(102);
tree.insert(103);
console.log(tree.isBalanced(tree.root));
tree.reBalance(tree);
console.log(tree.isBalanced(tree.root));
// console.log(JSON.stringify(tree.root, null, 4));
