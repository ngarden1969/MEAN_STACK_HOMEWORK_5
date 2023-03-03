/* 1:Create a function that everytime you invoke it, it will print out the message "Congrats you earn the chance!", however it can only print out the message with the first 5 excutions. all the rest invoke will print out the message "Sorry you missed the chance"*/

const printMsg = (function () {
  let counter = 0;
  return () => {
    if (counter < 5) {
      console.log("Congrats you earn the chance.");
      counter += 1;
    } else {
      console.log("Sorry! you missed the chance.");
      counter += 1;
    }
  };
})();
printMsg();
printMsg();
printMsg();
printMsg();
printMsg();
printMsg();
printMsg();
