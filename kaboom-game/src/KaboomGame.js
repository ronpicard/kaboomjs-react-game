import React, { useEffect, useRef } from "react";
import kaboom from "kaboom";

const KaboomGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const k = kaboom({
      canvas: canvasRef.current,
      width: 640,
      height: 480,
      background: [0, 0, 255],
      scale: 2,
    });

    k.loadSprite("bean", "https://kaboomjs.com/sprites/bean.png");

    k.scene("main", () => {
      const player = k.add([
        k.sprite("bean"),
        k.pos(100, 100),
        k.area(),
        k.body(),
      ]);

      k.onKeyDown("left", () => player.move(-120, 0));
      k.onKeyDown("right", () => player.move(120, 0));
      k.onKeyDown("up", () => player.jump(320));
    });

    k.go("main");

    return () => {
      // No cleanup needed here
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default KaboomGame;
