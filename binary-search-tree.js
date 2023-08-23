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
    const root = buildTree(array);
    // insert the value passed to it to the tree
    const insert = (newValue, tree = root) => {
        if (tree.value > newValue) {
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
    };
};
let tree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);

console.log(tree.height(Node(7, Node(6), Node(8, null, Node(9)))));
// console.log(JSON.stringify(tree.root, null, 4));
