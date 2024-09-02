import { Sprite } from '../domain/entities/sprite';
import { SpriteId } from '../domain/entities/sprite-id';

export class SpriteContainer {
  private constructor(private readonly _sprites: Map<string, Sprite>) {}

  static new(): SpriteContainer {
    return new SpriteContainer(new Map());
  }

  get sprites(): IterableIterator<Sprite> {
    return this._sprites.values();
  }

  getSprite(spriteId: SpriteId): Sprite {
    return this._sprites.get(spriteId.value);
  }

  setSprite(sprite: Sprite): SpriteId {
    const spriteId = SpriteId.new();
    this._sprites.set(spriteId.value, sprite);

    return spriteId;
  }

  removeSprite(spriteId: SpriteId): boolean {
    return this._sprites.delete(spriteId.value);
  }
}
