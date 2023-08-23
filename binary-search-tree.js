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
    // accepts a value and inserts the value in the tree
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

    return {
        root,
        insert,
    };
};
let tree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);

console.log(JSON.stringify(tree.root, null, 4));
