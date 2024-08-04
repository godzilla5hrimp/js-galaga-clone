import { UIStates } from "../utilities/ui_states.js"
import { Projectile } from "../common/projectile.js";

import { game } from "../../webgl-demo.js"

export class Player {
    constructor(game, spriteSheet) {
      this.game = game;
      this.spriteSheet = spriteSheet;
      this.width = 32;
      this.height = 32;
      this.x = this.game.width/2;
      this.y = this.game.height - 90;
      this.speedY = 0;
      this.speedX = 0;
      this.projectiles = [];
    }
    update() {
      if (game.keys.includes('ArrowLeft')) {
        this.speedX = -3;
      } else if (game.keys.includes('ArrowRight')) { 
        this.speedX = 3;
      } else {
        this.speedX = 0;
        this.speedY = 0;
      }
      if(this.x > this.game.width - this.width){
        this.x = this.game.width - this.width;
      } else if (this.x - this.width < 0) {
        this.x = this.width;
      }
      this.x += this.speedX;
      this.y += this.speedY;

      //handle projectiles
      this.projectiles.forEach(element => {
        element.update();
      });
      this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
    }
    shoot() {
      this.projectiles.push(new Projectile(this.game, this.x, this.y));
    }
    draw(context) {
      if(this.game.gameState === UIStates.game) {
        this.spriteSheet.drawPlayerNormal(context, this);
        this.projectiles.forEach(element => {
          element.draw(context);
        });
      }
    }
  }