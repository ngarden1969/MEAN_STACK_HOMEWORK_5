const circles = document.querySelectorAll(".circle");
const startBtn = document.querySelector(".start_btn");
let scoreSpan = document.querySelector(".score_span");
let timer = document.querySelector(".timer_span");

//random number and setInterval for mole to pop up
let counter = 0;
let score = 0;
let circlePicker = setInterval(() => {
  let randomPosition = Math.floor(Math.random() * 12);
  let temp = [];

  if (counter < 3) {
    temp.push(circles[randomPosition]);
    // console.log(randomPosition);
    circles[randomPosition].setAttribute("id", "mole");
    counter++;
  } else {
    clearInterval(setInterval);
  }

  return temp;
}, 1000);``

//removes the mole when clicked
circles.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.id === "mole") {
      item.removeAttribute("id", "mole");
      counter--;
      score++;
      scoreSpan.textContent = score;
      console.log(score);
    }
  });
});

startBtn.addEventListener("click", () => {
  let countdown = 30;
  let timerStart = setInterval(() => {
    if (countdown >= 0) {
      timer.textContent = countdown;
      countdown--;
    } else {
      alert("Time is over");
      scoreSpan.textContent = 0;
      countdown = 30;
      clearInterval(setInterval);
    }
  }, 1000);
});
// console.log([...circles]);

const View = (() => {
  //holds all the dom elements that needs to be interpreted
  const domElements = [
    (start_button = document.querySelector(".start_btn")),
    (score_update = document.querySelector(".score_span")),
    (timer_update = document.querySelector(".timer_span")),
    (content_container = document.querySelector(".content_container")),
    (circle_selector = document.querySelectorAll(".cirlce")),
  ];

  //function to create template for image inside the circle

  const circlePicker = (circleArr) => {
    let randomCircle = Math.floor(Math.random() * 12);
    let counter = 0;
    let temp = "";

    setInterval(() => {
      circleArr.forEach((item, arr) => {
        if (counter < 4) {
          arr[item].classList.add("mole");
        }
      });
    }, 1000);
  };
  return circlePicker;
})();
