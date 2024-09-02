import { Offset } from './offset';

export class Sprite {
  private constructor(
    public readonly pipeline: GPURenderPipeline,
    public readonly offset: Offset
  ) {}

  static new(pipeline: GPURenderPipeline, offset: Offset): Sprite {
    return new Sprite(pipeline, offset);
  }
}
