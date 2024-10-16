import { SpriteSheet } from "./utilities/sprite_sheet.js"
import { InputHandler } from "./utilities/input_handler.js"
import { Background } from "./utilities/background.js"
import { Player } from "./player/player.js"
import { UI } from "./utilities/ui.js"
import { MenuStates } from "./utilities/menu_states.js"
import { UIStates } from "./utilities/ui_states.js"
import { SmallEnemyShip } from "./enemies/small_enemy_ship.js"

import { game } from "../webgl-demo.js"


export class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.spriteSheet = new SpriteSheet();
      this.input = new InputHandler(this);
      this.background = new Background(this);
      this.player = new Player(this, this.spriteSheet);
      this.ui = new UI(this);
      this.menuChoice = MenuStates.onePlayer;
      this.fontFamily = 'PixeloidMono';
      this.highScore = 30000;
      this.fivebatch = 0;
      this.enemyLeftCol = 0;
      this.enemyRightCol = 0;
      this.enemyLeftRow = 0;
      this.enemyRightRow = 0;
      //TODO: make sure that the enums are working as states here
      this.gameState = UIStates.mainMenu;
      //TODO: fix this state
      this.gameOver = false;
      this.isPaused = true;
      this.score = 0;
      this.gameTime = 0;

      //timers
      this.enemyTimer = 0;
      this.enemyInterval = 1000;

      //arrays
      this.keys = [];
      this.projectiles = [];
      this.lifes = 3;
      this.enemies = [];
    }

    update(deltaTime) {
      if (!this.isPaused) {
        this.background.update();
        if(!this.gameOver) this.gameTime += deltaTime;
        this.player.update();
        this.enemies.forEach(enemy => {
          this.player.projectiles.forEach(projectile => {
            if (this.checkCollision(projectile, enemy)) {
              enemy.markedForDeletion = true;
              projectile.markedForDeletion = true;
              this.score += 5;
            }
          });
          enemy.update();
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        if((this.enemyTimer > this.enemyInterval) && !this.gameOver && this.enemies.length < 20) {
          //console.log("fivebatch:" + this.fivebatch);
          if(this.fivebatch < 5) {
            this.addEnemy(this.enemyLeftCol, this.enemyLeftRow, "left");
            this.enemyLeftCol++;
          } else {
            this.addEnemy(this.enemyRightCol, this.enemyRightRow, "right");
            this.enemyRightCol++;
          }
          this.enemyTimer = 0;
          this.fivebatch++;
          if (this.fivebatch >= 10) {
            this.fivebatch = 0;
            this.enemyRightCol = 0;
            this.enemyRightRow++;
            this.enemyLeftCol = 0;
            this.enemyLeftRow++;
          }
        } else {
          this.enemyTimer += deltaTime;
        }
      }
    }
    
    addEnemy(colNumber, rowNumber, startDirection) {
      this.enemies.push(new SmallEnemyShip(this, colNumber, rowNumber, startDirection));
      if (this.enemyLeftRow > 0) {
        //console.log("enemyLeftRowNum:" + this.enemyLeftRow + "; enemyLefColNum:" + this.enemyLeftCol);
      }
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });
      this.ui.draw(context);
    }

    checkCollision(rect1, rect2) {
      return(
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect1.y
      )
    }
}