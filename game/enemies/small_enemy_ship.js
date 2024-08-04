import { Enemy } from "./enemy.js"
import { game } from "../../webgl-demo.js"

export class SmallEnemyShip extends Enemy {
    constructor(game) {
      super(game);
      this.x = 0;
      this.y = this.generateYPosition(this.x);
    }
}