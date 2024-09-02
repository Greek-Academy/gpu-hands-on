import { v4 } from 'uuid';

export class SpriteId {
  private constructor(public readonly value: string) {}

  static new(): SpriteId {
    return new SpriteId(v4());
  }
}
