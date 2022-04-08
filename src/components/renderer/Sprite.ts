export default class Sprite {
  position: Position;
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D, position: Position) {
    this.context = context;
    this.position = position;
  }

  draw() {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.position.x, this.position.y, 50, 150);
  }
}
