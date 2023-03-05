// const circles = document.querySelectorAll(".circle");
// const startBtn = document.querySelector(".start_btn");
// let scoreSpan = document.querySelector(".score_span");
// let timer = document.querySelector(".timer_span");
// let counter = 0;
// let score = 0;

// startBtn.addEventListener("click", () => {
//   const timerEnd = setInterval(timerStart, 1000);
//   const circleInterval = setInterval(circlePicker, 1000);

//   let randomPosition;
//   let temp = [];

//   function circlePicker() {
//     // setInterval(() => {
//     randomPosition = randomPosition = Math.floor(
//       Math.random() * circles.length
//     );

//     if (counter < 3) {
//       temp.push(circles[randomPosition]);
//       circles[randomPosition].setAttribute("id", "mole");
//       counter++;
//     } else {
//       clearInterval(circleInterval);
//     }
//     return console.log(temp);
//     // }, 1000);
//   }

//   moleRemover();

//   let countdown = 10;
//   function timerStart() {
//     if (countdown >= 0) {
//       timer.textContent = countdown;
//       countdown--;
//     } else {
//       clearInterval(timerEnd);

//       alert("Time is over");
//       score = 0;
//       scoreSpan.textContent = score;
//       countdown = 0;
//       emptyCircle();
//     }
//   }

//   // circlePicker();
// });

// const emptyCircle = () => {
//   circles.forEach((item) => {
//     if (item.id === "mole") {
//       item.removeAttribute("id", "mole");
//     }
//   });
// };
// //random number and setInterval for mole to pop up

// //removes the mole when clicked

// let moleRemover = () => {
//   circles.forEach((item) => {
//     item.addEventListener("click", () => {
//       if (item.id === "mole") {
//         item.removeAttribute("id", "mole");
//         counter--;
//         score++;
//         scoreSpan.textContent = score;
//       }
//       // clearInterval(circlePicker);
//     });
//   });
// };

/*********************MVC Pattern not done yet */
//work needed for applying MVC pattern

const View = (() => {
  const domSelector = {
    circles: document.querySelectorAll(".circle"),
    startBtn: document.querySelector(".start_btn"),
    scoreSpan: document.querySelector(".score_span"),
    timer: document.querySelector(".timer_span"),
  };

  return { domSelector };
})();

const Model = ((view) => {
  const { domSelector } = View;

  class State {
    constructor(score, timeLeft) {
      this._score = 0;
      this._timeLeft = 30;
    }

    get score() {
      return this._score;
    }

    get timeLeft() {
      return this._timeLeft;
    }
    set score(count) {
      this._score = count;
    }
    set timeLeft(time) {
      this._timeLeft = time;
    }
  }

  const state = new State();
  return { State };
})(View);

const Controller = (() => {
  const { domSelector } = View;
  const { State } = Model;
  const state = new State();
  let first3 = 0;

  domSelector.startBtn.addEventListener("click", () => {
    let circleInterval = setInterval(circlePicker, 1000);

    let timeInterval = setInterval(timerStart, 1000);
    let snakeInterval = setInterval(snakeHole, 2000);
    function circlePicker() {
      let rand = Math.floor(Math.random() * domSelector.circles.length);
      let temp = [];

      if (first3 < 3) {
        temp.push(domSelector.circles[rand]);
        domSelector.circles[rand].setAttribute("id", "mole");
        first3++;
      } else if (countdown === 0) {
        clearInterval(circleInterval);
      }
      return temp;
    }
    function snakeHole() {
      let rand = Math.floor(Math.random() * domSelector.circles.length);
      console.log(rand);

      domSelector.circles.forEach((item) => {
        if (item.id === "snake") {
          item.removeAttribute("id", "snake");
        } else {
          domSelector.circles[rand].setAttribute("id", "snake");
          if (countdown === 0) {
            clearInterval(snakeInterval);
          }
        }

        domSelector.circles.forEach((item) => {
          item.addEventListener("click", () => {
            if (item.id === "snake") {
              domSelector.circles.forEach((item) => {
                item.setAttribute("id", "snake");
                clearInterval(snakeInterval);
                clearInterval(circleInterval);
                score = 0;
                domSelector.scoreSpan.textContent = score;
                domSelector.timer.textContent = 0;

                countdown = 0;
              });
            }
          });
        });
      });
    }

    let countdown = state.timeLeft;
    function timerStart() {
      if (countdown > 0) {
        countdown--;
        domSelector.timer.textContent = countdown;
      } else {
        clearInterval(timeInterval);

        alert("Time is over");
        state.score = 0;
        domSelector.scoreSpan.textContent = state.score;
        countdown = 0;
        emptyCircle();
      }
    }
  });

  function moleRemover() {
    domSelector.circles.forEach((item) => {
      item.addEventListener("click", () => {
        if (item.id === "mole") {
          item.removeAttribute("id", "mole");
          first3--;
          state.score++;
          domSelector.scoreSpan.textContent = state.score;
        }
      });
    });
  }
  moleRemover();

  const emptyCircle = () => {
    domSelector.circles.forEach((item) => {
      if (item.id === "mole" || "snake") {
        item.removeAttribute("id", "mole");
        item.removeAttribute("id", "snake");
      }
    });
  };
})(View, Model);
