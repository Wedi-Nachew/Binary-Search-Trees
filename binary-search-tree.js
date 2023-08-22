/* Psuedo Code 
 find middle item in the array
 create a node using the middle item
 set node left to be a recursive call of the the items left to the middle item
 set node right to be a recursive call of the the items right to the middle item
 return node
*/
// a Node factory that returns the value and left & right attributes
const Node = (value) => {
    let left = null;
    let right = null;
    return { value, left, right };
};

function buildTree(array, start = 0, end = array.length - 1) {
    array = Array.from(new Set(array.sort()));

    if (start > end) {
        return null;
    }
    let mid = Number.parseInt((start + end) / 2);
    const node = Node(array[mid]);
    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);

    return node;
}
console.log(JSON.stringify(buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]), null, 4));
