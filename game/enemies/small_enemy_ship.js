import { Enemy } from "./enemy.js"


export class SmallEnemyShip extends Enemy {
    constructor(game, colNumber, rowNumber, startDirection) {
      super(game, colNumber, rowNumber, startDirection);
    }

}