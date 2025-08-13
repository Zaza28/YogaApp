const main = document.querySelector("main");
const basicArray = [
  {
    picture: 0,
    min: 1,
  },
  {
    picture: 1,
    min: 1,
  },
  {
    picture: 2,
    min: 1,
  },

  {
    picture: 3,
    min: 1,
  },
  {
    picture: 4,
    min: 1,
  },
  {
    picture: 5,
    min: 1,
  },
  {
    picture: 6,
    min: 1,
  },
  {
    picture: 7,
    min: 1,
  },
  {
    picture: 8,
    min: 1,
  },
  {
    picture: 9,
    min: 1,
  },
];
let exoArray = [];
// get stored exo array :
(() => {
  if (localStorage.exos) {
    exoArray = JSON.parse(localStorage.exos);
  } else {
    exoArray = basicArray;
  }
})();
class Exercice {
  constructor() {
    this.index = 0;
    this.minutes = exoArray[this.index].min;
    this.seconds = 0;
  }
  updateCountdown() {
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

    setTimeout(() => {
      if (this.minutes === 0 && this.seconds === "00") {
        this.index++;
        this.ring();
        if (this.index < exoArray.length) {
          this.minutes = exoArray[this.index].min;
          this.seconds = 0;
          this.updateCountdown();
        } else {
          return page.finish();
        }
      } else if (this.seconds === "00") {
        this.minutes--;
        this.seconds = 59;
        this.updateCountdown();
      } else {
        this.seconds--;
        this.updateCountdown();
      }
    }, 10);

    return (main.innerHTML = `
    <div class ="exercice-container">
    <p>${this.minutes}:${this.seconds}</p>
    <img src="./img/${exoArray[this.index].picture}.png"/>
    <div>${this.index + 1}/${exoArray.length}</div>
    </div>`);
  }

  ring() {
    const audio = new Audio();
    audio.src = "ring.mp3";
    audio.play();
  }
}

const useful = {
  pageContent: function (title, content, btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },
  handleEventMinutes: function () {
    document.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener("input", (e) => {
        exoArray.map((exo) => {
          if (exo.picture == e.target.id) {
            exo.min = parseInt(e.target.value);
            this.store();
          }
        });
      });
    });
  },
  handleEventArrow: function () {
    document.querySelectorAll(".arrow").forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        let position = 0;
        exoArray.map((exo) => {
          if (exo.picture == e.target.dataset.pic && position !== 0) {
            [exoArray[position], exoArray[position - 1]] = [
              exoArray[position - 1],
              exoArray[position],
            ];
            page.lobby();
            this.store();
          } else {
            position++;
          }
        });
      });
    });
  },
  deleteItem: function () {
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let newArray = [];
        exoArray.map((exo) => {
          if (exo.picture != e.target.dataset.pic) {
            newArray.push(exo);
          }
        });
        exoArray = newArray;
        page.lobby();
        this.store();
      });
    });
  },
  reboot: function () {
    exoArray = basicArray;
    page.lobby();
    this.store();
  },
  store: function () {
    localStorage.exos = JSON.stringify(exoArray);
  },
};

const page = {
  lobby: function () {
    let mapArray = exoArray
      .map((exo) => {
        return `
    <li>
    <div class="card-header">
    <input type="number" id =${exo.picture} min="1" max="10" value=${exo.min}>
    <span>min</span>
    </div>
    <img src="./img/${exo.picture}.png"/>
    <i class="fas fa-arrow-circle-left arrow" data-pic=${exo.picture}></i>
    <i class="fas fa-times-circle deleteBtn" data-pic=${exo.picture}></i>
    </li>
    `;
      })
      .join("");

    useful.pageContent(
      "Paramétrage <i id='reboot' class='fas fa-undo'></i>",
      "<ul>" + mapArray + "</ul>",
      "<button id='start'>Commencer<i class ='far fa-play-circle'></i></button>"
    );
    useful.handleEventMinutes();
    useful.handleEventArrow();
    useful.deleteItem();
    reboot.addEventListener("click", () => useful.reboot());
    start.addEventListener("click", () => this.routine());
  },

  routine: function () {
    const exercice = new Exercice();
    useful.pageContent("Routine", exercice.updateCountdown(), null);
  },
  finish: function () {
    useful.pageContent(
      "C'est terminé !",
      "<button id='start'>Recommencer</button>",
      "<button id='reboot' class = 'btn-reboot'>Réinitialiser<i class= 'fas fa-times-circle'></i></button>"
    );
    start.addEventListener("click", () => this.routine());
    reboot.addEventListener("click", () => useful.reboot());
  },
};
page.lobby();
