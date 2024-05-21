window.addEventListener('load', function () {
  // canvas setup
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', event => {
        console.log(event.key);
        let index = this.game.keys.indexOf(event.key);
        if ((event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') 
        && this.game.keys.indexOf(event.key) === -1) {
          this.game.keys.push(event.key);
        }
      });
      window.addEventListener('keyup', event => {
        let index = this.game.keys.indexOf(event.key);
        if (index > -1) {
          this.game.keys.splice(index, 1);
        }
      });
    }
  }

  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 2;
      this.height = 4;
      this.speed = 3;
    }
    update() {
      this.x += this.speed;
    }
  }

  class Particle {

  }

  class Enemy {

  }
  class Player {
    constructor(game) {
      this.game = game;
      this.width = 8;
      this.height = 7;
      this.x = 20;
      this.y = 100;
      this.speedY = 0;
      this.speedX = 0;
    }
    update() {
      if (game.keys.includes('ArrowUp')) {
        this.speedY = -1;
      } else if (game.keys.includes('ArrowDown')) {
        this.speedY = 1;
      } else if (game.keys.includes('ArrowLeft')) {
        this.speedX = -1;
      } else if (game.keys.includes('ArrowRight')) { 
        this.speedX = 1;
      } else {
        this.speedX = 0;
        this.speedY = 0;
      }
      this.x += this.speedX;
      this.y += this.speedY;
    }
    draw(context) {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  class Layer {

  }
  class Background {

  }
  class UI {

  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.input = new InputHandler(this);
      this.player = new Player(this);
      this.keys = [];
    }
    update() {
      this.player.update();
    }
    draw(context) {
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(loop);
  }
  loop();
});
