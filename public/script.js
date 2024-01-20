// public/script.js
document.addEventListener('DOMContentLoaded', function () {
  const rollButton = document.getElementById('roll-button');
  const resetButton = document.getElementById('reset-button');
  const board = document.getElementById('board');
  const result = document.getElementById('result');
  const dieResult = document.getElementById('dieResult');
  
  const players = [{ name: 'Player 1', position: 1 }, { name: 'Player 2', position: 1 }];
  let currentPlayerIndex = 0;
  const targetScore = 42;
  
  rollButton.addEventListener('click', function () {
    const rollResult = rollDie();
    dieResult.textContent = rollResult;
    movePlayer(rollResult);
  });
  
  resetButton.addEventListener('click', function () {
    resetGame();
  });

  function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function movePlayer(rollResult) {
    const currentPlayer = players[currentPlayerIndex];
    const oldPosition = currentPlayer.position;
    const newPosition = oldPosition + rollResult;

    // Define snakes and ladders
    const snakesAndLadders = { 32: 1};

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
      currentPlayerIndex = 1 - currentPlayerIndex; // Switch to the other player
    }
  }

  function renderBoard() {
    board.innerHTML = '';
    const tasks = ["Start",
    "Breast Massage For 2 Minutes",
    "Sing A Song And Give Me A Lap Dance",
    "Pretend To Walk On A Ramp And Pout For Cameras",
    "You Have One Minute To Turn Mẹ On Using Only Your Feet",
    "Put Chocolate Sauce On Your Partner's Body And Lick It",
    "Give A Hickey",
    "Get Down On One Knee & Propose Me With At Least 100 Words",
    "Remove Your Partner's Underwear Only Using Your Teethes",
    "Dress Up Your Partner In Your Cloths And Take A Picture",
    "Lick The Nipples Of Your Partner",
    "Get Down On One Knee And Propose With A Dirty Joke",
    "Blindfold Me And Then Touch Me With A Random Object Until I Guess What It Is",
    "BJ",
    "Switch Clothing While Hugging, Don't Separate Your Bodies",
    "Trade Your Cloths Seductively In Exchange Of That Thing Tht You Want From Your Partner",
    "Suck Your Partner's Finger Passionately For 30 Seconds",
    "Give Love Bites On The Chest And Neck Of Your Partner",
    "Find An Old Photograph & Re Create It As Closely As Possible",
    "Do As Many Sit Ups As You Can In One Minute",
    "Safe",
    "Kiss Three Favorite Body Parts Of My Bod",
    "Try To Impress Me With Cheesy Pickup Lines",
    "Body Massage",
    "Take Naughty Selfies With Your Partner",
    "Kiss Passionately Like In Movie",
    "Nude Pic Together",
    "Sing A Romantic Song And Dance With Your Partner",
    "69",
    "Lick Your Partner's Face",
    "Watch Porn Video And Enact Like The Same With Your Partner",
    "Start Again",
    "Make Your Partner Horny Without Touching Them",
    "Enact Your Favorite Position With A Pillow",
    "Blindfold Me And Then Give A Yoni Or Lingam Oil Massage For 2-5 Minutes",
    "French Kiss For 3 Minutes",
    "Orel Sex For 2 Minutes",
    "Pretend I Am A Stranger At A Bar, Try To Pick Me Up & Convince Me To Come Home With You",
    "Blindfold Me And Then Give A Lick Vagina Or Cock For 2-5 Minutes in a Fast Phase",
    "Bring You Face Really Close To You Partner Without Touching And Stare Into Their Eyes For 30 Seconds",
    "Finish"];

    for (let i = 1; i <= 42; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = tasks[i-1] + " " +  i;

      players.forEach((player, index) => {
        if (player.position === i) {
          const playerToken = document.createElement('div');
          playerToken.className = `player${index + 1}-token`;
          cell.appendChild(playerToken);
        }
      });

      board.appendChild(cell);
    }
  }

  function showWinner(winningPlayer) {
    result.textContent = `${winningPlayer.name} wins!`;
    rollButton.disabled = true;
  }

  function resetGame() {
    players.forEach(player => {
      player.position = 1;
    });

    currentPlayerIndex = 0;
    rollButton.disabled = false;
    result.textContent = '';
    renderBoard();
  }

  renderBoard();
});
