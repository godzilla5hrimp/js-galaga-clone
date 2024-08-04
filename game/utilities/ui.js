import { UIStates } from "./ui_states.js";
import { MenuStates } from "./menu_states.js";

export class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 25;
      this.fontFamily = 'PixeloidMono';
      this.color = 'white';
      this.fps = 5;
    }

    draw(context) {
      switch (this.game.gameState) {
        case UIStates.mainMenu:
          context.save();
          this.drawMainMenu(context);
          this.drawMenuOptions(context)
          switch(this.game.menuChoice) {
            case MenuStates.onePlayer:
              this.drawPicker(context, 1);
              break;
            case MenuStates.twoPlayers:
              this.drawPicker(context, 2);
              break;
            case MenuStates.rules:
              this.drawPicker(context, 3);
              break;
            case MenuStates.options:
              this.drawPicker(context, 4);
              break;          
          }
          context.restore();
          break;
        case UIStates.game:
          this.drawScore(context, this.game);
          if(this.game.isPaused) {
            console.log('paused');
            this.setTextStyleAndDrawInTheMiddle(context, 'PAUSED', 'press P to unpause');
          }
          if (this.game.gameOver) {
            this.setTextStyleAndDrawInTheMiddle(context, 'GAME OVER');
          }
          for (let i = 1; i < this.game.lifes; i++) {
            context.drawImage(this.game.spriteSheet.sheet, 109, 1, 15, 16, 18 * i * 2 - 30, this.game.height - 40, 32, 32);
          }
          break;
        case UIStates.help:
          this.drawMainMenu(context);
          this.drawRules(context, this.game.deltaTime);
          break;
        }
        this.drawHighScore(context);
    }

    setTextStyleAndDrawInTheMiddle(context, text, additionalText) {
      context.save();
      context.textAlign = 'center';
      context.fillStyle = 'white';
      context.font = '30px ' + this.fontFamily;
      context.fillText(text, this.game.width * 0.5, this.game.height * 0.5);
      context.fillText(additionalText, this.game.width * 0.5, this.game.height * 0.5 + 50, this.game.width);
      context.restore();
    }

    drawMainMenu(context) {
      //red text part
      context.save();
      context.fillStyle = 'red';
      context.font = '20px ' + this.fontFamily;
      context.fillText('1UP', 15, 20);
      context.fillText('2UP', this.game.width - 140, 20);
      context.fillStyle = 'white';
      context.fillText(this.game.score, 15, 40);
      context.fillText(0, this.game.width - 140, 40);
      context.restore();
    }

    drawHighScore(context) {
      context.save();
      context.fillStyle = 'red';
      context.font = '20px ' + this.fontFamily;
      context.fillText('HIGHSCORE', (this.game.width - 150) * 0.5, 20);
      context.fillStyle = 'white';
      context.fillText(this.game.highScore, (this.game.width - 75) * 0.5, 40);
      context.restore();
    }

    drawMenuOptions(context) {
      context.save();
      context.font = '20px ' + this.fontFamily;
      context.fillStyle = 'white';
      context.fillText('1 PLAYER', this.game.width * 0.4, this.game.height * 0.5);
      context.fillStyle = 'gray';
      context.fillText('2 PLAYER', this.game.width * 0.4, this.game.height * 0.5 + 30);
      context.fillStyle = 'white';
      context.fillText('RULES', this.game.width * 0.4, this.game.height * 0.5 + 60);
      context.fillText('OPTIONS', this.game.width * 0.4, this.game.height * 0.5 + 90);
      context.restore();
    }

    drawScore(context, game) {
      context.save();
      context.font = '20px ' + this.fontFamily;
      context.fillStyle = 'white';
      context.fillText(game.score, 15, 40);
      context.fillStyle = 'red';
      context.fillText('1UP', 15, 20);
      context.restore();
    }

    drawRules(context, deltaTime) {
      context.save();
      context.fillStyle = 'cyan';
      context.font = '20px ' + this.fontFamily;
      context.fillText('---- SCORE ----', this.game.width * 0.3 - 10, this.game.height * 0.25);
      context.fillText('50', this.game.width * 0.45, this.game.height * 0.3);
      context.fillText('100', this.game.width * 0.65, this.game.height * 0.3);
      context.drawImage(this.game.spriteSheet.sheet, 130, 93, 10, 11, this.game.width * 0.25 , this.game.height * 0.3 - 23, 25, 25);
      context.fillText('160', this.game.width * 0.65, this.game.height * 0.35);
      context.fillText('80', this.game.width * 0.45, this.game.height * 0.35);
      context.drawImage(this.game.spriteSheet.sheet, 110, 75, 14, 10, this.game.width * 0.25, this.game.height * 0.32, 25, 25);
      context.restore();
    }

    animateExample() {
      
    }

    drawPicker(context, position) {
      context.save();
      //TODO: fix sprite rotation
      //context.rotate(90 * Math.PI /180);
      //TODO: fix all the magical numbers
      switch(position) {
        case 1:
          context.drawImage(this.game.spriteSheet.sheet, 289, 170, 14, 18, this.game.width * 0.4 - 40, this.game.height * 0.5 - 23, 25, 25);
          break;
        case 2:
          context.drawImage(this.game.spriteSheet.sheet, 289, 170, 14, 18, this.game.width * 0.4 - 40, this.game.height * 0.5 + 7, 25, 25);
          break; 
        case 3:
          context.drawImage(this.game.spriteSheet.sheet, 289, 170, 14, 18, this.game.width * 0.4 - 40, this.game.height * 0.5 + 37, 25, 25);
          break;
        case 4:
          context.drawImage(this.game.spriteSheet.sheet, 289, 170, 14, 18, this.game.width * 0.4 - 40, this.game.height * 0.5 + 67, 25, 25);
          break;
      }
      context.restore();
    }
  }