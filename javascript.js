$(document).ready(function() {
  $.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
  }

  currentColor = null

  $("#guess-button").click(function() {
    handleGuess()
  })

  $("#guess").enterKey(function () {
    handleGuess()
  })

  $("#play-again").click(function () {
    $(".results").hide()
    color = selectRandomColor()
    setColor(color)
    currentColor = color
    $(".answer").text(color)
    $("#guess").val("")
    $("#guess").focus()
  })

  function handleGuess() {
    enteredText = $("#guess").val()
    if (/^[A-Fa-f0-9]{6}$/.test(enteredText)) {
      $(".incorrect-format").hide()
      rComponentGuess = Number("0x" + enteredText.slice(0, 2))
      gComponentGuess = Number("0x" + enteredText.slice(2, 4))
      bComponentGuess = Number("0x" + enteredText.slice(4, 6))

      rComponentAnswer = Number("0x" + currentColor.slice(1, 3))
      gComponentAnswer = Number("0x" + currentColor.slice(3, 5))
      bComponentAnswer = Number("0x" + currentColor.slice(5, 7))

      distance = Math.floor((((rComponentAnswer - rComponentGuess)**2) +
        ((gComponentAnswer - gComponentGuess)**2) +
        ((bComponentAnswer - bComponentGuess)**2))**(0.5))

      $(".distance").text(distance)
      $(".sample-guess").css("background-color", "#" + enteredText)
      assignRating(distance)
      $(".results").show()
    } else {
      $(".incorrect-format").show()
    }
  }

  function assignRating() {
    if (distance < 1) {
      $(".rating").text("(Perfect!)")
    } else if (distance < 5) {
      $(".rating").text("(Amazing!)")
    } else if (distance < 10) {
      $(".rating").text("(Great!)")
    } else if (distance < 20) {
      $(".rating").text("(Very good!)")
    } else if (distance < 50) {
      $(".rating").text("(Good!)")
    } else if (distance < 100) {
      $(".rating").text("(Not bad!)")
    } else if (distance < 200) {
      $(".rating").text("(Kinda bad!)")
    } else if (distance < 400) {
      $(".rating").text("(Really bad!)")
    } else {
      $(".rating").text("(WTF?)")
    }
  }

  function setColor(color) {
    $(".sample").css("background-color", color)
  }

  function setInitialColor() {
    color = selectRandomColor()
    currentColor = color
    setColor(color)
    $(".answer").text(color)
    $(".game-area").show()
  }

  function selectRandomColor() {
    options = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
    string = "#" + options[randomInteger(0, 15)] +
      options[randomInteger(0, 15)] +
      options[randomInteger(0, 15)] +
      options[randomInteger(0, 15)] +
      options[randomInteger(0, 15)] +
      options[randomInteger(0, 15)]

    return string
  }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setInitialColor()
})
