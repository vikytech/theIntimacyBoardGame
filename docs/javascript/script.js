document.addEventListener("DOMContentLoaded", function () {
  const rollButton = document.getElementById("roll-button");
  const resetButton = document.getElementById("reset-button");
  const fullScreenButton = document.getElementById("fullscreen-toggle-button");
  const landscapeContainer = document.getElementsByClassName(
    "switch-to-landscape"
  );
  const board = document.getElementById("board");
  const result = document.getElementById("result");
  const dieResult = document.getElementById("dieResult");
  const gameContainer = document.getElementById("game-container");
  const checkpoint = document.getElementById("checkpoint");
  const totpTokenButton = document.getElementById("totpTokenButton");

  const players = [
    { index: 1, name: "Vik", position: 1, token: "♁", color: "#1ce467" },
    { index: 2, name: "Gailee", position: 1, token: "♀", color: "#e8591c" },
  ];
  let currentPlayerIndex = 0;
  var encodedTasks = [];
  const tasks = [
    "U3RhcnQ6OvCfjZHwn6SM8J+Pu/CfjJo=",
    "QnJlYXN0IE1hc3NhZ2UgRm9yIDIgTWludXRlczo68J+ZjPCfj7s=",
    "U2luZyBBIFNvbmcgQW5kIEdpdmUgTWUgQSBMYXAgRGFuY2U6OvCfkoPwn4+7",
    "UHJldGVuZCBUbyBXYWxrIE9uIEEgUmFtcCBBbmQgUG91dCBGb3IgQ2FtZXJhczo68J+TuPCfpLPwn4+7",
    "WW91IEhhdmUgT25lIE1pbnV0ZSBUbyBUdXJuIE1lIE9uIFVzaW5nIE9ubHkgWW91ciBGZWV0Ojrwn6a28J+Pu/Cfq6bwn6a28J+Puw==",
    "UHV0IENob2NvbGF0ZSBTYXVjZSBPbiBZb3VyIFBhcnRuZXIncyBCb2R5IEFuZCBMaWNrIEl0Ojrwn42r",
    "R2l2ZSBBIEhpY2tleTo68J+RhA==",
    "R2V0IERvd24gT24gT25lIEtuZWUgJiBQcm9wb3NlIE1lIFdpdGggQXQgTGVhc3QgMTAwIFdvcmRzOjrwn4y5",
    "UmVtb3ZlIFlvdXIgUGFydG5lcidzIFVuZGVyd2VhciBPbmx5IFVzaW5nIFlvdXIgVGVldGhlczo68J+YrPCfqbLwn5GZ",
    "RHJlc3MgVXAgWW91ciBQYXJ0bmVyIEluIFlvdXIgQ2xvdGhzIEFuZCBUYWtlIEEgUGljdHVyZTo68J+Rl/CfkZnwn5GY",
    "TGljayBUaGUgTmlwcGxlcyBPZiBZb3VyIFBhcnRuZXI6OvCfkYU=",
    "R2V0IERvd24gT24gT25lIEtuZWUgQW5kIFByb3Bvc2UgV2l0aCBBIERpcnR5IEpva2U6OvCfpKE=",
    "QmxpbmRmb2xkIE1lIEFuZCBUaGVuIFRvdWNoIE1lIFdpdGggQSBSYW5kb20gT2JqZWN0IFVudGlsIEkgR3Vlc3MgV2hhdCBJdCBJczo68J+ZiPCfq6M=",
    "Qko6OuKcivCfj7vwn4ys77iP8J+SqPCfkqY=",
    "U3dpdGNoIENsb3RoaW5nIFdoaWxlIEh1Z2dpbmcsIERvbid0IFNlcGFyYXRlIFlvdXIgQm9kaWVzOjrwn6SX8J+rgg==",
    "VHJhZGUgWW91ciBDbG90aHMgU2VkdWN0aXZlbHkgSW4gRXhjaGFuZ2UgT2YgVGhhdCBUaGluZyBUaGF0IFlvdSBXYW50IEZyb20gWW91ciBQYXJ0bmVyOjrwn6S38J+Pu+KAjeKZgu+4j+KBiA==",
    "U3VjayBZb3VyIFBhcnRuZXIncyBGaW5nZXIgUGFzc2lvbmF0ZWx5IEZvciAzMCBTZWNvbmRzOjrwn5aV8J+Pu/CfkYQ=",
    "R2l2ZSBMb3ZlIEJpdGVzIE9uIFRoZSBDaGVzdCBBbmQgTmVjayBPZiBZb3VyIFBhcnRuZXI6OvCfq6bwn5is",
    "RmluZCBBbiBPbGQgUGhvdG9ncmFwaCAmIFJlIENyZWF0ZSBJdCBBcyBDbG9zZWx5IEFzIFBvc3NpYmxlOjrwn46e77iP",
    "RG8gQXMgTWFueSBTaXQgVXBzIEFzIFlvdSBDYW4gSW4gT25lIE1pbnV0ZTo68J+Pi/Cfj7vigI3imYDvuI8=",
    "U2FmZTo68J+Ruw==",
    "S2lzcyBUaHJlZSBGYXZvcml0ZSBCb2R5IFBhcnRzIE9mIE1pbmU6OvCfkos=",
    "VHJ5IFRvIEltcHJlc3MgTWUgV2l0aCBDaGVlc3kgUGlja3VwIExpbmVzOjrwn6ug8J+kpA==",
    "Qm9keSBNYXNzYWdlOjrwn5GQ8J+Puw==",
    "VGFrZSBOYXVnaHR5IFNlbGZpZXMgV2l0aCBZb3VyIFBhcnRuZXI6OvCfpLPwn4+7",
    "S2lzcyBQYXNzaW9uYXRlbHkgTGlrZSBJbiBNb3ZpZTo68J+nkfCfj7vigI3inaTvuI/igI3wn5KL4oCN8J+nkfCfj7vwn5KL8J+YmA==",
    "TnVkZSBQaWMgVG9nZXRoZXI6OvCfq6Pwn5O4",
    "U2luZyBBIFJvbWFudGljIFNvbmcgQW5kIERhbmNlIFdpdGggWW91ciBQYXJ0bmVyOjrwn4628J+OpA==",
    "Njk6OuKZi++4jw==",
    "TGljayBZb3VyIFBhcnRuZXIncyBGYWNlOjrwn5iL8J+RhQ==",
    "V2F0Y2ggUG9ybiBWaWRlbyBBbmQgRW5hY3QgTGlrZSBUaGUgU2FtZSBXaXRoIFlvdXIgUGFydG5lcjo68J+TgPCfjJrwn46m",
    "U3RhcnQgQWdhaW46OvCflIQ=",
    "TWFrZSBZb3VyIFBhcnRuZXIgSG9ybnkgV2l0aG91dCBUb3VjaGluZyBUaGVtOjrwn5mF8J+Pu+KAjeKZgu+4j/Cfmrfwn5mF8J+Pu+KAjeKZgO+4jw==",
    "RW5hY3QgWW91ciBGYXZvcml0ZSBQb3NpdGlvbiBXaXRoIEEgUGlsbG93Ojrwn5uM",
    "QmxpbmRmb2xkIE1lIEFuZCBUaGVuIEdpdmUgQSBZb25pIE9yIExpbmdhbSBPaWwgTWFzc2FnZSBGb3IgMi01IE1pbnV0ZXM6OvCfp7Twn5Km8J+ZjPCfj7s=",
    "RnJlbmNoIEtpc3MgRm9yIDMgTWludXRlczo68J+Si/Cfkovwn5KL",
    "T3JlbCBTZXggRm9yIDIgTWludXRlczo68J+YsfCfmIg=",
    "UHJldGVuZCBJIEFtIEEgU3RyYW5nZXIgQXQgQSBCYXIsIFRyeSBUbyBQaWNrIE1lIFVwICYgQ29udmluY2UgTWUgVG8gQ29tZSBIb21lIFdpdGggWW91Ojrwn6Ww8J+PoA==",
    "QmxpbmRmb2xkIE1lIEFuZCBUaGVuIEdpdmUgQSBMaWNrIFZhZ2luYSBPciBDb2NrIEZvciAyLTUgTWludXRlcyBpbiBhIEZhc3QgUGhhc2U6OvCfkYXwn5iL",
    "QnJpbmcgWW91IEZhY2UgUmVhbGx5IENsb3NlIFRvIFlvdSBQYXJ0bmVyIFdpdGhvdXQgVG91Y2hpbmcgQW5kIFN0YXJlIEludG8gVGhlaXIgRXllcyBGb3IgMzAgU2Vjb25kczo68J+ZhfCfj7vigI3imYLvuI/wn5GA8J+ZhfCfj7vigI3imYDvuI8=",
    "RmluaXNoOjrwn6uo8J+NjA=="
];
  const targetScore = tasks.length;

  const validateUser = () => {
    let key = new URLSearchParams(window.location.search).get("secret")?.trim();
    key = key?.substring(1, key.length - 1);
    const totpToken = document.getElementById("totpToken").value;
    const totp = new TOTP(key);
    if (totp?.verify(totpToken)) {
      checkpoint.classList.add("hidden");
      gameContainer.classList.remove("hidden");
      landscapeContainer[0].classList.remove("hidden");
    }
  };

  totpTokenButton.addEventListener("click", validateUser);

  const createDice = () => {
    for (let i = 1; i <= 6; i++) {
      const dice = document.createElement("div");
      dice.setAttribute("class", "dice diceGrid dice_one_f" + i);
      for (let j = 0; j < i; j++) {
        const dot = document.createElement("p");
        dot.setAttribute("class", "dot");
        dice.appendChild(dot);
      }
      dieResult.appendChild(dice);
    }
  };

  const rollDie = () => {
    const randomDiceNumber = Math.floor(Math.random() * 6 + 1);
    const dice = document.querySelector(".dice_one_f" + randomDiceNumber);
    const audio = new Audio((src = "/audio/dice-sound.mp3"));
    const elements = document.querySelectorAll(".dice");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active_dice");
    }
    dice.classList.add("active_dice");
    audio.play();
    return randomDiceNumber;
  };

  const movePlayer = () => {
    const rollResult = rollDie();
    const currentPlayer = players[currentPlayerIndex];
    const oldPosition = currentPlayer.position;
    const newPosition = oldPosition + rollResult;
    const cells = document.querySelectorAll(".cell");
    const currentPlayerToken = document.getElementById(
      `player-token-${currentPlayer.index}`
    );
    currentPlayerToken.remove();

    const snakesAndLadders = { 32: 1 };
    if (snakesAndLadders[newPosition]) {
      const moveType = newPosition > oldPosition ? "Snake" : "Ladder";
      result.textContent = `${currentPlayer.name} found a ${moveType}! Moving to ${snakesAndLadders[newPosition]}.`;
      currentPlayer.position = snakesAndLadders[newPosition];
    } else {
      currentPlayer.position = newPosition;
      result.textContent = `${currentPlayer.name} rolled a ${rollResult}.`;
    }

    const move = (cell) => {
      cell.classList.add("currentPlayer");
      cell.scrollIntoView();
      const tokenContainer = cell.childNodes[1];
      tokenContainer.appendChild(currentPlayerToken);
    };

    cells.forEach((cell) => {
      cell.classList.remove("currentPlayer");
      if (cell.id.substring(4) === currentPlayer.position.toString()) {
        move(cell);
      }
    });

    if (currentPlayer.position >= targetScore) {
      currentPlayerToken.remove();
      const lastCell = cells[targetScore - 1];
      move(lastCell);
      showWinner(currentPlayer);
    } else {
      currentPlayerIndex = 1 - currentPlayerIndex;
    }
  };

  dieResult.addEventListener("click", movePlayer);
  rollButton.addEventListener("click", movePlayer);

  const renderBoard = () => {
    board.innerHTML = "";

    for (let i = 1; i <= targetScore; i++) {
      const cell = document.createElement("div");
      const text = document.createElement("p");

      cell.id = "cell" + i;
      cell.className = "cell";
      const textContent = Base64.decode(tasks[i - 1]).split("::");
      const title = textContent[0];
      const emojis = textContent[1];
      text.textContent = title;
      cell.setAttribute("data-emojis", emojis);
      cell.appendChild(text);

      const tokens = document.createElement("div");
      tokens.className = "cell-active-players";
      players.forEach((player, index) => {
        if (player.position === i) {
          const playerToken = document.createElement("div");
          playerToken.id = `player-token-${index + 1}`;
          playerToken.className = `player-token`;
          playerToken.textContent = player.token;
          playerToken.style.backgroundColor = player.color;
          tokens.appendChild(playerToken);
        }
      });
      cell.appendChild(tokens);

      board.appendChild(cell);
    }
  };

  const showWinner = (winningPlayer) => {
    const winnerAudio = new Audio((src = "/audio/end-game.mp3"));
    rollButton.disabled = true;
    dieResult.style.cursor = "not-allowed";
    dieResult.removeEventListener("click", movePlayer);
    result.textContent = `${winningPlayer.name} wins!`;
    winnerAudio.play();
  };

  const resetGame = () => {
    players.forEach((player) => {
      player.position = 1;
    });

    currentPlayerIndex = 0;
    rollButton.disabled = false;
    dieResult.style.cursor = "pointer";
    dieResult.addEventListener("click", movePlayer);
    result.textContent = "";
    renderBoard();
  };

  const toggleFullscreen = () => {
    const body = document.documentElement;
    if (
      (document.fullScreenElement !== undefined &&
        document.fullScreenElement === null) ||
      (document.msFullscreenElement !== undefined &&
        document.msFullscreenElement === null) ||
      (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
      (document.webkitIsFullScreen !== undefined &&
        !document.webkitIsFullScreen)
    ) {
      if (body.requestFullScreen) {
        body.requestFullScreen();
      } else if (body.mozRequestFullScreen) {
        body.mozRequestFullScreen();
      } else if (body.webkitRequestFullScreen) {
        body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (body.msRequestFullscreen) {
        body.msRequestFullscreen();
      }
      fullScreenButton.classList.remove("enter-fullscreen");
      fullScreenButton.classList.add("exit-fullscreen");
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      fullScreenButton.classList.add("enter-fullscreen");
      fullScreenButton.classList.remove("exit-fullscreen");
    }
  };

  resetButton.addEventListener("click", resetGame);

  renderBoard();
  createDice();
  fullScreenButton.addEventListener("click", toggleFullscreen);
});
