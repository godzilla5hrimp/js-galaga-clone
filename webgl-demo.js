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
        let index = this.game.keys.indexOf(event.key);
        if ((event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') 
        && this.game.keys.indexOf(event.key) === -1) {
          this.game.keys.push(event.key);
        } else if (event.key === 'a') {
          this.game.player.shoot();
        } else if (event.key === 'p' && this.game.isPaused) {
          this.game.isPaused = false;
        } else if (event.key === 'p') {
          this.game.isPaused = true;
        } else if (event.key === 'g') {
          this.game.gameOver = true;
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
      this.y -= this.speed;
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
    constructor(game) {
      this.game = game;
      this.y = 0;
      this.width = 8;
      this.height = 7;
      this.speedY = 2;
      this.markedForDeletion = false;
    }

    update() {
      this.y += this.speedY;
      if(this.y > this.game.height) this.markedForDeletion = true;
    }

    draw(context) {
      context.fillStyle = 'red';
      context.fillRect(this.x, this.y, this.width, this.height); 
    }
  }

  class SmallEnemyShip extends Enemy {
    constructor(game) {
      super(game);
      this.x = Math.random() * (this.game.width * 0.9 - this.width);
    }
  }

  class Player {
    constructor(game) {
      this.game = game;
      this.width = 8;
      this.height = 7;
      this.x = this.game.width/2;
      this.y = 400;
      this.speedY = 0;
      this.speedX = 0;
      this.projectiles = [];
    }
    update() {
      if (game.keys.includes('ArrowUp')) {
        this.speedY = -3;
      } else if (game.keys.includes('ArrowDown')) {
        this.speedY = 3;
      } else if (game.keys.includes('ArrowLeft')) {
        this.speedX = -3;
      } else if (game.keys.includes('ArrowRight')) { 
        this.speedX = 3;
      } else {
        this.speedX = 0;
        this.speedY = 0;
      }
      this.x += this.speedX;
      this.y += this.speedY;

      //handle projectiles
      this.projectiles.forEach(element => {
        element.update();
      });
      this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
    }
    shoot() {
      this.projectiles.push(new Projectile(this.game, this.x, this.y));
    }
    draw(context) {
      context.fillStyle = 'black';
      context.fillRect(this.x, this.y, this.width, this.height);
      this.projectiles.forEach(element => {
        element.draw(context);
      });
    }
  }
  
  class Layer {
  
  }

  class Background {
    constructor(game) {
      this.game = game;
    }

    update() {

    }

    draw(context) {
      //TODO: draw randomly appearing stars as a background moving down
    }
  }

  class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 25;
      this.fontFamily = 'Helvetica';
      this.color = 'white';
    }

    draw(context) {
      context.save();
      context.fillStyle = this.color;
      context.font = this.fontSize + 'px ' + this.fontFamily;
      context.fillText('Score: ' + this.game.score, 20, 40);
      for (let i = 1; i < this.game.lifes; i++) {
        context.fillRect(15 * i, 450, 3, 20);
      }
      context.restore();
    }
  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.input = new InputHandler(this);
      this.background = new Background(this);
      this.player = new Player(this);
      this.ui = new UI(this);
      //TODO: fix this state
      this.gameOver = false;
      this.isPaused = true;
      this.score = 0;
      this.gameTime = 0;

      //timers
      this.enemyTimer = 0;
      this.enemyInterval = 1000;

      //arrays
      this.keys = [];
      this.projectiles = [];
      this.lifes = 3;
      this.enemies = [];
    }

    update(deltaTime) {
      if (!this.isPaused) {
        this.background.update();
        if(!this.gameOver) this.gameTime += deltaTime;
        this.player.update();
        this.enemies.forEach(enemy => {
          this.player.projectiles.forEach(projectile => {
            if (this.checkCollision(projectile, enemy)) {
              enemy.markedForDeletion = true;
              projectile.markedForDeletion = true;
              this.score += 5;
            }
          });
          enemy.update();
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        if((this.enemyTimer > this.enemyInterval) && !this.gameOver) {
          this.addEnemy();
          this.enemyTimer = 0;
        } else {
          this.enemyTimer += deltaTime;
        }
      }
    }
    
    addEnemy() {
      this.enemies.push(new SmallEnemyShip(this));
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });
      if(this.isPaused) {
       context.save();
       context.textAlign = 'center';
       context.fillStyle = 'white';
       context.font = '50px ' + this.fontFamily;
       context.fillText('Paused', this.width * 0.5, this.height * 0.5);
       context.restore(); 
      }
      if(this.gameOver) {
        //TODO: fix fill text for other text not to jump + text colour
        context.save();
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.font = '50px ' + this.fontFamily; 
        context.fillText('Game Over', this.width * 0.5, this.height * 0.5);
        context.restore();
      }
      this.ui.draw(context);
    }

    checkCollision(rect1, rect2) {
      return(
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect1.y
      )
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function loop(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(loop);
  }
  loop(0);
});
