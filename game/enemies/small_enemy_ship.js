import { Enemy } from "./enemy.js"


export class SmallEnemyShip extends Enemy {
    constructor(game, frequencyDifference) {
      super(game);
      this.x = 0;
      this.y = this.generateYPosition(this.x);
    }

    update() {
      // //TODO: change this normal curve to Besier curve in the future
      // this.x += 2;
      // this.y = this.generateYPosition(this.x);
      // if(this.y > this.game.height) this.markedForDeletion = true;
            //TODO: change this normal curve to Besier curve in the future
      if (this.y >= this.game.height / 2 && !this.reachedPosition) {
        this.x += 2;
        this.y = this.generateYPosition(this.x);
        this.frequencyDifference;
      } else {
        this.y += 2;
      }
      if(this.y > this.game.height) this.markedForDeletion = true;
    }

}