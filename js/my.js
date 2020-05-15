//здесь наше представление
var veiw = {
  displayMassage: function (msg) {
    var messageArea = document.querySelector("#messageArea");
    messageArea.innerHTML = msg;
  },

  displayHit: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

// здесь наша модель поведения игры
// var ships = [
//     var ship1 = { locatiion: ["10", "20", "30"], hits: ["", "hit", ""] },
//     var ship2 = { locatiion: ["32", "33", "34"], hits: ["", "", ""] },
//     var ship3 = { locatiion: ["64", "64", "65"], hits: ["hit", "", ""] }
// ];

var model = {
  boardSize: 7, // зазмер игрового поля
  numShips: 3, //колличество кораблей
  shipLenght: 3, //длинна ккорабля в клетках
  shipsSunk: 0, //колличество потопленых кораблей

  ships: [
    (ship1 = { location: ["10", "20", "30"], hits: ["", "", ""] }),
    (ship2 = { location: ["32", "33", "34"], hits: ["", "", ""] }),
    (ship3 = { location: ["63", "64", "65"], hits: ["", "", ""] }),
  ],

  fire: function (guess) {
    //получает координаты выстрела
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      // location = ship.location; //избавляемся от временной переменной
      // var index = location.indexOf(guess);
      var index = ship.location.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit"; //есть попадание
        veiw.displayHit(guess);
        veiw.displayMassage("Попал");
        if (this.isSunk(ship)) {
          veiw.displayMassage("Ты потопил мой корабль");
          this.shipsSunk++;
        }
        return true;
      }
    }
    veiw.displayMiss(guess);
    veiw.displayMassage("Промазал");
    return false;
  },
  isSunk: function (ship) {
    for (var i = 0; i < this.shipLenght; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },

  // генерация кораблей на игровом поле
  generateShipLocations: function () {
    var location;
    for (var i = 0; i < this.numShips; i++) {
      do {
        location = this.generateShip();
      } while (this.collision(location));
      this.ships[i].location = location;
    }
    console.log("Корабли находятся по таким координатам: ");
    console.log(this.ships);
  },

  generateShip: function () {
    var direction = Math.floor(Math.random() * 2);
    var row, col;
    if (direction === 1) {
      // horizontal ship
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLenght));
    } else {
      // vertical ship
      row = Math.floor(Math.random() * (this.boardSize - this.shipLenght));
      col = Math.floor(Math.random() * this.boardSize);
    }
    var newShipLocation = [];

    for (var i = 0; i < this.shipLenght; i++) {
      if (direction === 1) {
        //добавляем массив в горизонтальный корабль
        newShipLocation.push(row + "" + (col + i));
      } else {
        //добавляем массив в вертикальный корабль
        newShipLocation.push(row + i + "" + col);
      }
    }
    return newShipLocation;
  },

  collision: function (location) {
    for (var i = 0; i < this.shipLenght; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < location.length; j++) {
        if (ship.location.indexOf(location[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  },
};

var controler = {
  guesses: 0,
  processGuess: function (guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        veiw.displayMassage(
          "Вы потопили все корабли за: " + this.guesses + " выстрелов"
        );
      }
    }
  },
};

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess === null || guess.length !== 2) {
    alert("Вы ввели не верные координаты");
  } else {
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var colomn = guess.charAt(1);
    if (isNaN(row) || isNaN(colomn)) {
      alert("Вы ввели не верные координаты");
    } else if (
      row < 0 ||
      row >= model.boardSize ||
      colomn < 0 ||
      colomn >= model.boardSize
    ) {
      alert("Вы ввели не верные координаты");
    } else {
      return row + colomn;
    }
  }
  return null;
}

function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handlOnKeyPress;
}
function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controler.processGuess(guess);
  guessInput.value = "";
}

function handlOnKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

window.onload = init;
// controler.processGuess("B0");
// controler.processGuess("C0");
// controler.processGuess("D0");

// controler.processGuess("D2");
// controler.processGuess("D3");
// controler.processGuess("D4");

// controler.processGuess("G3");
// controler.processGuess("G4");
// controler.processGuess("G5");

// // parseGuess("A2");
