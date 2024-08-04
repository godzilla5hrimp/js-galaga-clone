import { Enemy } from "./enemy.js"


export class SmallEnemyShip extends Enemy {
    constructor(game) {
      super(game);
      this.x = 0;
      this.y = this.generateYPosition(this.x);
    }

}