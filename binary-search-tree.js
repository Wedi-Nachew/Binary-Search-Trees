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
