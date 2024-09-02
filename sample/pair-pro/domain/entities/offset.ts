export class Offset {
  private constructor(private _x: number, private _y: number) {}

  static new(x: number, y: number): Offset {
    return new Offset(x, y);
  }

  public move(x: number, y: number) {
    this._x += x;
    this._y += y;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}
