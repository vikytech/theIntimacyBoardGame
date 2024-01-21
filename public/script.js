document.addEventListener('DOMContentLoaded', function () {
  const rollButton = document.getElementById('roll-button');
  const resetButton = document.getElementById('reset-button');
  const board = document.getElementById('board');
  const result = document.getElementById('result');
  const dieResult = document.getElementById('dieResult');
  const gameContainer = document.getElementById('game-container');
  const checkpoint = document.getElementById('checkpoint');

  const players = [{ name: 'Vik', position: 1, "token": "♁", "color": "#1ce467" }, { name: 'Gailee', position: 1, "token": "♀", "color": "#e8591c" }];
  let currentPlayerIndex = 0;
  const tasks = ["Start ✊🏻💦🍑🤌🏻🌚🚺🚹🚻♂︎♁♀︎⚤",
    "Breast Massage For 2 Minutes::🙌🏻",
    "Sing A Song And Give Me A Lap Dance::💃🏻",
    "Pretend To Walk On A Ramp And Pout For Cameras::📸🤳🏻",
    "You Have One Minute To Turn Me On Using Only Your Feet::🦶🏻🫦🦶🏻",
    "Put Chocolate Sauce On Your Partner's Body And Lick It::🍫",
    "Give A Hickey::👄",
    "Get Down On One Knee & Propose Me With At Least 100 Words::🌹",
    "Remove Your Partner's Underwear Only Using Your Teethes::😬🩲👙",
    "Dress Up Your Partner In Your Cloths And Take A Picture::👗👙👘",
    "Lick The Nipples Of Your Partner::👅",
    "Get Down On One Knee And Propose With A Dirty Joke::🤡",
    "Blindfold Me And Then Touch Me With A Random Object Until I Guess What It Is::🙈🫣",
    "BJ::✊🏻🌬️💨💦",
    "Switch Clothing While Hugging, Don't Separate Your Bodies::🤗🫂",
    "Trade Your Cloths Seductively In Exchange Of That Thing Tht You Want From Your Partner::🤷🏻‍♂️⁈",
    "Suck Your Partner's Finger Passionately For 30 Seconds::🖕🏻👄",
    "Give Love Bites On The Chest And Neck Of Your Partner::🫦😬",
    "Find An Old Photograph & Re Create It As Closely As Possible::🎞️",
    "Do As Many Sit Ups As You Can In One Minute::🏋🏻‍♀️",
    "Safe::👻",
    "Kiss Three Favorite Body Parts Of Mine::💋",
    "Try To Impress Me With Cheesy Pickup Lines::🫠🤤",
    "Body Massage::👐🏻",
    "Take Naughty Selfies With Your Partner::🤳🏻",
    "Kiss Passionately Like In Movie::🧑🏻‍❤️‍💋‍🧑🏻💋😘",
    "Nude Pic Together::🫣📸",
    "Sing A Romantic Song And Dance With Your Partner::🎶🎤",
    "69::♋️",
    "Lick Your Partner's Face::😋👅",
    "Watch Porn Video And Enact Like The Same With Your Partner::📀🌚🎦",
    "Start Again::🔄",
    "Make Your Partner Horny Without Touching Them::🙅🏻‍♂️🚷🙅🏻‍♀️",
    "Enact Your Favorite Position With A Pillow::🛌",
    "Blindfold Me And Then Give A Yoni Or Lingam Oil Massage For 2-5 Minutes::🧴💦🙌🏻",
    "French Kiss For 3 Minutes::💋💋💋",
    "Orel Sex For 2 Minutes::😱😈",
    "Pretend I Am A Stranger At A Bar, Try To Pick Me Up & Convince Me To Come Home With You::🥰🏠",
    "Blindfold Me And Then Give A Lick Vagina Or Cock For 2-5 Minutes in a Fast Phase::👅😋",
    "Bring You Face Really Close To You Partner Without Touching And Stare Into Their Eyes For 30 Seconds::🙅🏻‍♂️👀🙅🏻‍♀️",
    "Finish::🫨🍌"];
  const targetScore = tasks.length;

  const validateUser = (event) => {
    event.preventDefault();
    const totpToken = document.getElementById('totpToken').value;

    fetch('/auth/totp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totpToken }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) throw data.error;
        checkpoint.classList.add('hidden');
        gameContainer.classList.remove('hidden');
      })
      .catch(error => console.error('Error:', error));
  };

  document.getElementById('totpForm').addEventListener('submit', validateUser);

  const createDice = () => {
    for (let i = 1; i <= 6; i++) {
      const dice = document.createElement('div');
      dice.setAttribute("class", "dice diceGrid dice_one_f" + i)
      for (let j = 0; j < i; j++) {
        const dot = document.createElement('p');
        dot.setAttribute("class", "dot");
        dice.appendChild(dot);
      }
      dieResult.appendChild(dice);
    }
  };

  const rollDie = () => {
    const randomDiceNumber = Math.floor((Math.random() * 6) + 1);
    const dice = document.querySelector('.dice_one_f' + randomDiceNumber);
    const audio = new Audio((src = "https://bit.ly/dice-sound"));
    const elements = document.querySelectorAll('.dice');
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('active_dice');
    }
    dice.classList.add("active_dice")
    audio.play();
    return randomDiceNumber;
  };

  const movePlayer = () => {
    const rollResult = rollDie();
    const currentPlayer = players[currentPlayerIndex];
    const oldPosition = currentPlayer.position;
    const newPosition = oldPosition + rollResult;

    // Define snakes and ladders
    const snakesAndLadders = { 32: 1 };

    // Check for snakes and ladders
    if (snakesAndLadders[newPosition]) {
      const moveType = newPosition > oldPosition ? 'Snake' : 'Ladder';
      result.textContent = `${currentPlayer.name} found a ${moveType}! Moving to ${snakesAndLadders[newPosition]}.`;
      currentPlayer.position = snakesAndLadders[newPosition];
    } else {
      currentPlayer.position = newPosition;
      result.textContent = `${currentPlayer.name} rolled a ${rollResult}.`;
    }

    renderBoard();

    if (currentPlayer.position >= targetScore) {
      showWinner(currentPlayer);
    } else {
      currentPlayerIndex = 1 - currentPlayerIndex;
    }
  };

  dieResult.addEventListener('click', movePlayer);
  rollButton.addEventListener('click', movePlayer);

  const renderBoard = () => {
    board.innerHTML = '';

    for (let i = 1; i <= targetScore; i++) {
      const cell = document.createElement('div');
      const text = document.createElement('p');
      cell.className = 'cell';
      text.textContent = tasks[i - 1] + " (" + i + ")";
      cell.appendChild(text);

      const tokens = document.createElement('div');
      tokens.className = "cell-active-players"
      players.forEach((player, index) => {
        if (player.position === i) {
          const playerToken = document.createElement('div');
          playerToken.id = `player-token-${index + 1}`;
          playerToken.className = `player-token`;
          playerToken.textContent = player.token;
          playerToken.style.backgroundColor = player.color
          // playerToken.style.transform = "translate(" + index * 25 + "px, 0px)";
          tokens.appendChild(playerToken);
        }
      });
      cell.appendChild(tokens);

      board.appendChild(cell);
    }
  };

  const showWinner = (winningPlayer) => {
    const winnerAudio = new Audio(src = "https://cdn.pixabay.com/download/audio/2022/03/10/audio_1dface9538.mp3?filename=touching-46084.mp3");
    rollButton.disabled = true;
    dieResult.style.cursor = "not-allowed";
    dieResult.removeEventListener('click', movePlayer);
    result.textContent = `${winningPlayer.name} wins!`;
    winnerAudio.play();
  };

  const resetGame = () => {
    players.forEach(player => {
      player.position = 1;
    });

    currentPlayerIndex = 0;
    rollButton.disabled = false;
    dieResult.style.cursor = "pointer";
    dieResult.addEventListener('click', movePlayer);
    result.textContent = '';
    renderBoard();
  };

  resetButton.addEventListener('click', resetGame);

  renderBoard();
  createDice();
});
