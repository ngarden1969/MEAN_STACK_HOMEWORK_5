/* Filter an Array with a user input of minimum length
 */

const arr1 = ["123123", "123", "451511", "422"];
let minimumLength = 7;

let myFilter = function (input) {
  return function (item) {
    return item.length > input;
  };
};
console.log(arr1.filter(myFilter(minimumLength)));
