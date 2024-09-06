import { Offset } from './offset';

export class Sprite {
  private constructor(
    public readonly pipeline: GPURenderPipeline,
    public readonly vertexCount: GPUSize32,
    public readonly offset: Offset
  ) {}

  static new(
    pipeline: GPURenderPipeline,
    vertexCount: GPUSize32,
    offset: Offset
  ): Sprite {
    return new Sprite(pipeline, vertexCount, offset);
  }
}
