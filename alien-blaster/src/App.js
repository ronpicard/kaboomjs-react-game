import { useEffect } from "react";

function App() {
  useEffect(() => {
    const k = window.kaboom({
      width: 640,
      height: 480,
      scale: 2,
      canvas: document.getElementById("game"),
      background: [0, 0, 0],
    });

    const MOVE_SPEED = 200;

    const player = k.add([
      k.rect(40, 20),
      k.pos(k.center().x, k.height() - 40),
      k.area(),
      k.color(0, 0, 255),
      "player",
    ]);

    k.keyDown("left", () => {
      player.move(-MOVE_SPEED, 0);
    });

    k.keyDown("right", () => {
      player.move(MOVE_SPEED, 0);
    });

    k.keyPress("space", () => {
      k.add([
        k.rect(6, 12),
        k.pos(player.pos.x + 17, player.pos.y),
        k.area(),
        k.move(k.UP, 400),
        k.cleanup(),
        k.color(255, 255, 0),
        "bullet",
      ]);
    });

    k.loop(1, () => {
      k.add([
        k.rect(30, 20),
        k.pos(k.rand(0, k.width() - 30), 0),
        k.area(),
        k.move(k.DOWN, 100),
        k.color(255, 0, 0),
        "enemy",
      ]);
    });

    const score = { value: 0 };

    const scoreLabel = k.add([
      k.text("0"),
      k.pos(12, 12),
      k.layer("ui"),
      {
        value: score.value,
      },
    ]);

    k.onCollide("bullet", "enemy", (b, e) => {
      k.destroy(b);
      k.destroy(e);
      score.value += 100;
      scoreLabel.text = score.value;
    });

    k.onCollide("enemy", "player", () => {
      k.go("lose", { score: score.value });
    });

    k.scene("lose", ({ score }) => {
      k.add([
        k.text("Game Over\nScore: " + score),
        k.pos(k.center()),
        k.origin("center"),
      ]);
    });
  }, []);

  return <canvas id="game" />;
}

export default App;
