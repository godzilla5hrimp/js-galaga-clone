export class SpriteSheet {
    constructor() {
      this.sheet = document.getElementById('sprites');
    }

    drawPlayerNormal(context, player) {
      context.drawImage(this.sheet, 109, 1, 15, 16, player.x - 14, player.y + 6, player.width, player.height);
    }
  }