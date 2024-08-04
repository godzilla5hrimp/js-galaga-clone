export class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 2;
      this.height = 4;
      this.speed = 3;
      this.markedForDeletion = false;
    }
    update() {
      this.y -= this.speed;
      if (this.x > this.game.width) this.markedForDeletion = true;
    }
    draw(context) {
      context.drawImage(this.game.spriteSheet.sheet, 313, 122, 3, 7, this.x, this.y, 6, 14);
    }
  }