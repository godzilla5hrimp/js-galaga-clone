import { Game } from "./game/game.js";

canvas.width = 500;
canvas.height = 800;
export const game = new Game(canvas.width, canvas.height);

window.addEventListener('load', function () {
  // canvas setup
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  class Layer {
  
  }

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
