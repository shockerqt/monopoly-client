import { useEffect, useRef } from 'react';
import Sprite from '../components/renderer/Sprite';

const Monopoly = () => {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = useRef(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      const room = new Sprite(context, { x: 50, y: 50 });
      room.draw();
    }
  }, []);

  return (
    <canvas ref={canvasRef} width={900} height={600}></canvas>
  );
};

export default Monopoly;
