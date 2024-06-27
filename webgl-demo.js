window.addEventListener('load', function () {
  // canvas setup
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 800;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', event => {
        let index = this.game.keys.indexOf(event.key);
        if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') 
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
        } else if (event.key === 'ArrowUp' && this.game.menuChoice === 0) {
          this.game.menuChoice = MenuStates.options;
        } else if (event.key === 'ArrowUp') {
          this.game.menuChoice = this.game.menuChoice - 1;
        } else if (event.key === 'ArrowDown' && this.game.menuChoice === 3) {
          this.game.menuChoice = MenuStates.onePlayer;
        } else if (event.key === 'ArrowDonw' && this.game.menuChoice === 1) {
          this.game.menuChoice = MenuStates.rules;
        } else if (event.key === 'ArrowDown') {
          this.game.menuChoice = this.game.menuChoice + 1;
        } else if (event.key === ' ' && this.game.gameState === UIStates.mainMenu && this.game.menuChoice === MenuStates.onePlayer) {
          this.game.gameState = UIStates.game;
          this.game.isPaused = false;
        } else if(event.key === ' ' && this.game.gameState === UIStates.mainMenu && this.game.menuChoice === MenuStates.rules) {
          this.game.gameState = UIStates.help;
        } else if(event.key === ' ' && this.game.gameState === UIStates.help) {
          this.game.gameState = UIStates.mainMenu;
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
      if (this.x > this.game.width) this.markedForDeletion = true;
    }
    draw(context) {
      //context.fillStyle = 'yellow';
      //context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.game.spriteSheet.sheet, 313, 122, 3, 7, this.x, this.y, 6, 14);
    }
  }

  class Particle {

  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.y = 0;
      this.width = 32;
      this.height = 32;
      this.speedY = 2;
      this.markedForDeletion = false;
    }

    update() {
      this.y += this.speedY;
      if(this.y > this.game.height) this.markedForDeletion = true;
    }

    draw(context) {
      //context.fillStyle = 'red';
      //context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.game.spriteSheet.sheet, 110, 37, 16, 16, this.x, this.y, this.width, this.height); 
    }
  }

  class SmallEnemyShip extends Enemy {
    constructor(game) {
      super(game);
      this.x = Math.random() * (this.game.width * 0.9 - this.width);
    }
  }

  class SpriteSheet {
    constructor() {
      this.sheet = document.getElementById('sprites');
    }

    drawPlayerNormal(context, player) {
      context.drawImage(this.sheet, 109, 1, 15, 16, player.x - 14, player.y + 6, player.width, player.height);
    }
  }

  class Player {
    constructor(game, spriteSheet) {
      this.game = game;
      this.spriteSheet = spriteSheet;
      this.width = 32;
      this.height = 32;
      this.x = this.game.width/2;
      this.y = this.game.height - 90;
      this.speedY = 0;
      this.speedX = 0;
      this.projectiles = [];
    }
    update() {
      if (game.keys.includes('ArrowLeft')) {
        this.speedX = -3;
      } else if (game.keys.includes('ArrowRight')) { 
        this.speedX = 3;
      } else {
        this.speedX = 0;
        this.speedY = 0;
      }
      if(this.x > this.game.width - this.width){
        this.x = this.game.width - this.width;
      } else if (this.x - this.width < 0) {
        this.x = this.width;
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
      if(this.game.gameState === UIStates.game) {
        this.spriteSheet.drawPlayerNormal(context, this);
        this.projectiles.forEach(element => {
          element.draw(context);
        });
      }
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

  //TODO: check whether it will be possible to it differently
  const UIStates = {
    mainMenu: 'mainMenu',
    credits: 'credits',
    game: 'game',
    options: 'options',
    help: 'help',
    winnerTable: 'winnerTable',
    demo: 'demo'
  }

  //TODO: make it iterable
  const MenuStates = {
    onePlayer: 0,
    twoPlayers: 1,
    rules: 2,
    options: 3
  }

  class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 25;
      this.fontFamily = 'PixeloidMono';
      this.color = 'white';
      this.fps = 5;
    }

    draw(context) {
      switch (this.game.gameState) {
        case UIStates.mainMenu:
          context.save();
          //context.fillText('Single Player', this.game.height * 0.5, this.game.width * 0.5);
          this.drawMainMenu(context);
          this.drawMenuOptions(context)
          switch(this.game.menuChoice) {
            case MenuStates.onePlayer:
              this.drawPicker(context, 1);
              break;
            case MenuStates.twoPlayers:
              this.drawPicker(context, 2);
              break;
            case MenuStates.rules:
              this.drawPicker(context, 3);
              break;
            case MenuStates.options:
              this.drawPicker(context, 4);
              break;          
          }
          //console.log(this.game.gameState);
          context.restore();
          break;
        case UIStates.game:
          this.drawScore(context, this.game);
          //TODO: fix UI in a game state;
          context.save();
          //context.font = '20px ' + this.fontFamily;
          if(this.game.isPaused) {
            console.log('paused');
            this.setTextStyleAndDrawInTheMiddle(context, 'PAUSED');
          }
          if (this.game.gameOver) {
            this.setTextStyleAndDrawInTheMiddle(context, 'GAME OVER');
          }
          //context.fillText(this.game.score, 15, 40);
          //context.fillStyle = 'red';
          for (let i = 1; i < this.game.lifes; i++) {
            context.drawImage(this.game.spriteSheet.sheet, 109, 1, 15, 16, 18 * i * 2 - 30, this.game.height - 40, 32, 32);
          }
          context.restore();
          break;
        case UIStates.help:
          this.drawMainMenu(context);
          this.drawRules(context, this.game.deltaTime);
          break;
        }
        this.drawHighScore(context);
    }

    setTextStyleAndDrawInTheMiddle(context, text) {
      context.textAlign = 'center';
      context.fillStyle = 'white';
      context.font = '50px ' + this.fontFamily;
      context.fillText(text, this.game.width * 0.5, this.game.height * 0.5);
    }

    drawMainMenu(context) {
      //red text part
      context.save();
      context.fillStyle = 'red';
      context.font = '20px ' + this.fontFamily;
      context.fillText('1UP', 15, 20);
      context.fillText('2UP', this.game.width - 140, 20);
      context.fillStyle = 'white';
      context.fillText(this.game.score, 15, 40);
      context.fillText(0, this.game.width - 140, 40);
      context.restore();
    }

    drawHighScore(context) {
      context.save();
      context.fillStyle = 'red';
      context.font = '20px ' + this.fontFamily;
      context.fillText('HIGHSCORE', (this.game.width - 150) * 0.5, 20);
      context.fillStyle = 'white';
      context.fillText(this.game.highScore, (this.game.width - 75) * 0.5, 40);
      context.restore();
    }

    drawMenuOptions(context) {
      context.save();
      context.font = '20px ' + this.fontFamily;
      context.fillStyle = 'white';
      context.fillText('1 PLAYER', this.game.width * 0.4, this.game.height * 0.5);
      context.fillStyle = 'gray';
      context.fillText('2 PLAYER', this.game.width * 0.4, this.game.height * 0.5 + 30);
      context.fillStyle = 'white';
      context.fillText('RULES', this.game.width * 0.4, this.game.height * 0.5 + 60);
      context.fillText('OPTIONS', this.game.width * 0.4, this.game.height * 0.5 + 90);
      context.restore();
    }

    drawScore(context, game) {
      context.save();
      context.font = '20px ' + this.fontFamily;
      context.fillStyle = 'white';
      context.fillText(game.score, 15, 40);
      context.fillStyle = 'red';
      context.fillText('1UP', 15, 20);
      context.restore();
    }

    drawRules(context, deltaTime) {
      context.save();
      context.fillStyle = 'cyan';
      context.font = '20px ' + this.fontFamily;
      context.fillText('---- SCORE ----', this.game.width * 0.3 - 10, this.game.height * 0.25);
      context.fillText('50', this.game.width * 0.45, this.game.height * 0.3);
      context.fillText('100', this.game.width * 0.65, this.game.height * 0.3);
      context.drawImage(this.game.spriteSheet.sheet, 130, 93, 10, 11, this.game.width * 0.25 , this.game.height * 0.3 - 23, 25, 25);
      context.fillText('160', this.game.width * 0.65, this.game.height * 0.35);
      context.fillText('80', this.game.width * 0.45, this.game.height * 0.35);
      context.drawImage(this.game.spriteSheet.sheet, 110, 75, 14, 10, this.game.width * 0.25, this.game.height * 0.32, 25, 25);
      context.restore();
    }

    animateExample() {
      
    }

    drawPicker(context, position) {
      context.save();
      //TODO: fix sprite rotation
      //context.rotate(90 * Math.PI /180);
      //TODO: fix all the magical numbers
      switch(position) {
        case 1:
          context.drawImage(this.game.spriteSheet.sheet, 289, 170, 14, 18, this.game.width * 0.4 - 40, this.game.height * 0.5 - 23, 25, 25);
          break;
        case 2:
          context.drawImage(this.game.spriteSheet.sheet, 289, 170, 14, 18, this.game.width * 0.4 - 40, this.game.height * 0.5 + 7, 25, 25);
          break; 
        case 3:
          context.drawImage(this.game.spriteSheet.sheet, 289, 170, 14, 18, this.game.width * 0.4 - 40, this.game.height * 0.5 + 37, 25, 25);
          break;
        case 4:
          context.drawImage(this.game.spriteSheet.sheet, 289, 170, 14, 18, this.game.width * 0.4 - 40, this.game.height * 0.5 + 67, 25, 25);
          break;
      }
      context.restore();
    }
  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.spriteSheet = new SpriteSheet();
      this.input = new InputHandler(this);
      this.background = new Background(this);
      this.player = new Player(this, this.spriteSheet);
      this.ui = new UI(this);
      this.menuChoice = MenuStates.onePlayer;
      this.fontFamily = 'PixeloidMono';
      this.highScore = 30000;
      //TODO: make sure that the enums are working as states here
      this.gameState = UIStates.help;
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
