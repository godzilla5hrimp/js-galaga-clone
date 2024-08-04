export class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', event => {
        //TODO: make this asynchronomous
        let index = this.game.keys.indexOf(event.key);
        if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') 
        && this.game.keys.indexOf(event.key) === -1) {
          this.game.keys.push(event.key);
        } else if (event.key === 'a') {
          this.game.player.shoot();
        } else if (event.key === 'p' && this.game.isPaused) {
          this.game.isPaused = false;
        } else if (event.key === 'p') {
          this.game.isPaused = true;
        } else if (event.key === 'g') {
          this.game.gameOver = true;
        } else if (event.key === 'ArrowUp' && this.game.menuChoice === 0) {
          this.game.menuChoice = MenuStates.options;
        } else if (event.key === 'ArrowUp') {
          this.game.menuChoice = this.game.menuChoice - 1;
        } else if (event.key === 'ArrowDown' && this.game.menuChoice === 3) {
          this.game.menuChoice = MenuStates.onePlayer;
        } else if (event.key === 'ArrowDonw' && this.game.menuChoice === 1) {
          this.game.menuChoice = MenuStates.rules;
        } else if (event.key === 'ArrowDown') {
          this.game.menuChoice = this.game.menuChoice + 1;
        } else if (event.key === ' ' && this.game.gameState === UIStates.mainMenu && this.game.menuChoice === MenuStates.onePlayer) {
          this.game.gameState = UIStates.game;
          this.game.isPaused = false;
        } else if(event.key === ' ' && this.game.gameState === UIStates.mainMenu && this.game.menuChoice === MenuStates.rules) {
          this.game.gameState = UIStates.help;
        } else if(event.key === ' ' && this.game.gameState === UIStates.help) {
          this.game.gameState = UIStates.mainMenu;
        }
      });
      window.addEventListener('keyup', event => {
        let index = this.game.keys.indexOf(event.key);
        if (index > -1) {
          this.game.keys.splice(index, 1);
        }
      });
    }
  }