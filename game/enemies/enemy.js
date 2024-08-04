
export class Enemy {
    constructor(game) {
      this.game = game;
      this.x = 0;
      this.y = this.game.height + 50;
      this.width = 32;
      this.height = 32;
      this.speedY = 2;
      this.markedForDeletion = false;
      this.reachedPosition = false;
      this.frequency = 0.01;
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
      } else {
        this.y += 2;
      }
      if(this.y > this.game.height) this.markedForDeletion = true;
    }

    draw(context) {
      context.drawImage(this.game.spriteSheet.sheet, 110, 37, 16, 16, this.x, this.y, this.width, this.height); 
    }

    generateYPosition(x) {
      const amplitude = 600;
      const phaseShift = Math.PI / 4;
      return amplitude * Math.sin(this.frequency * x + phaseShift);
    }

    getBezierY(x, firstPoint, secondPoint) {

    }
}