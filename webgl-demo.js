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
        } else if (event.key === ' ') {
          this.game.player.shoot();
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
      this.markedForDeletion = false;
    }
    update() {
      this.x += this.speed;
      if (this.x > this.game.width * 0.8 ) this.markedForDeletion = true;
    }
    draw(context) {
      context.fillStyle = 'yellow';
      context.fillRect(this.x, this.y, this.width, this.height);
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
      this.projectiles = [];
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

      //handle projectiles
      this.projectiles.array.forEach(element => {
        element.update();
      });
      this.projectiles = this.projectiles.fileter(projectile => !projectile.markedForDeletion);
    }
    draw(context) {
      context.fillStyle = 'black';
      context.fillRect(this.x, this.y, this.width, this.height);
      this.projectiles.array.forEach(element => {
        element.draw(context);
      });
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
      this.projectiles = [];
    }
    update() {
      this.player.update();
    }
    draw(context) {
      this.player.draw(context);
    }
    shoot() {
      this.projectiles.push(new Projectile(this.game, this.x, this.y));
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
