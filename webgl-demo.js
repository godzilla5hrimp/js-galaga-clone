import { Enemy } from "./game/enemies/enemy.js"
import { SmallEnemyShip } from "./game/enemies/small_enemy_ship.js"
import { Player } from "./game/player/player.js";
import { UIStates } from "./game/utilities/ui_states.js";
import { Background } from "./game/utilities/background.js";
import { MenuStates } from "./game/utilities/menu_states.js";
import { SpriteSheet } from "./game/utilities/sprite_sheet.js";
import { Game } from "./game/game.js";


window.addEventListener('load', function () {
  // canvas setup
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 800;


  class Layer {
  
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
