
export class Enemy {
    //TODO: refactor to const or readonly when using TypeScript
    enemyClassPositions = {
      //TODO: move those definitions to the specific enemy class
      simpleLeft: {x:[-30, 50, 100, 164], y:[600, 500, 400, 300]},
      simpleRight: {x:[530, 550, 400, 292], y:[600, 500, 400, 300]},
      advanced:{x:[50, 100], y:[50, 100]}
    }

    constructor(game, colNumber, rowNumber, startDirection) {
      this.game = game;
      this.y = 650;
      this.width = 32;
      this.height = 32;
      this.speedY = 2;
      this.enemyColCount = colNumber;
      this.enemyRowCount = rowNumber;
      this.startPosition = startDirection;
      if (this.startPosition == "right") {
        this.x = 540;
      } else {
        this.x = -40;
      }
      this.markedForDeletion = false;
      this.deltaAnimationTime = 0;
    }

    bezier(t, p0, p1, p2, p3) {
      const oneMinusT = 1.0 - t;
      return oneMinusT * oneMinusT * oneMinusT * p0 + 
             3 * oneMinusT * oneMinusT * t * p1 +
             3 * oneMinusT * t * t * p2 +
             t * t * t * p3;
            } 
  
    caculateApproachRight() {
      this.x = this.bezier(this.deltaAnimationTime, this.enemyClassPositions.simpleRight.x[0] + this.enemyColCount*40, this.enemyClassPositions.simpleRight.x[1] + this.enemyColCount*40, this.enemyClassPositions.simpleRight.x[2] + this.enemyColCount*40, this.enemyClassPositions.simpleRight.x[3] + this.enemyColCount*40);
      this.y = this.bezier(this.deltaAnimationTime, this.enemyClassPositions.simpleRight.y[0] + this.enemyRowCount*40, this.enemyClassPositions.simpleRight.y[1] + this.enemyRowCount*40, this.enemyClassPositions.simpleRight.y[2] + this.enemyRowCount*40, this.enemyClassPositions.simpleRight.y[3] + this.enemyRowCount*40);
    }

    caculateApproachLeft() {
      this.x = this.bezier(this.deltaAnimationTime, this.enemyClassPositions.simpleLeft.x[0] - this.enemyColCount*40, this.enemyClassPositions.simpleLeft.x[1] - this.enemyColCount*40, this.enemyClassPositions.simpleLeft.x[2] - this.enemyColCount*40, this.enemyClassPositions.simpleLeft.x[3] - this.enemyColCount*40);
      this.y = this.bezier(this.deltaAnimationTime, this.enemyClassPositions.simpleLeft.y[0] +  this.enemyRowCount*40, this.enemyClassPositions.simpleLeft.y[1] + this.enemyRowCount*40, this.enemyClassPositions.simpleLeft.y[2] + this.enemyRowCount*40, this.enemyClassPositions.simpleLeft.y[3] + this.enemyRowCount*40);
    }

    animateIdle() {
      //TODO: add idle animation
    }

    animateLeave() {
      //TODO: add leaving animation
    }

    update() {
      if (this.startPosition == "left" && this.x < this.enemyClassPositions.simpleLeft.x[3] && this.y > this.enemyClassPositions.simpleLeft.y[3] + this.enemyRowCount*40) {
        this.caculateApproachLeft();
      } else if (this.startPosition == "right" && this.x != this.enemyClassPositions.simpleRight[3] && this.y > this.enemyClassPositions.simpleRight.y[3] + this.enemyRowCount*40) {
        this.caculateApproachRight();
      }
      
    }


    draw(context) {
      context.drawImage(this.game.spriteSheet.sheet, 110, 37, 16, 16, this.x, this.y, this.width, this.height);
      this.deltaAnimationTime = this.deltaAnimationTime + 0.006;
    }

    generateYPosition(x) {
      const amplitude = 600;
      const frequency = 0.01;
      const phaseShift = Math.PI / 4;
      return amplitude * Math.sin(frequency * x + phaseShift);
    }
}