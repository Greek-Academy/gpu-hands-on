import blockVertWGSL from '../shaders/block.vert.wgsl';
import redFragWGSL from '../shaders/red.frag.wgsl';
import { GPURenderEngine, KeyboardManager } from '../application';
import { KeyCode } from '../application/enums/key-code';

export function renderPlayerBlock(
  engine: GPURenderEngine,
  textureFormat: GPUTextureFormat,
  keyboardManager: KeyboardManager
) {
  // スプライトの生成
  const sprite = engine.createSprite({
    vertexWGSL: blockVertWGSL,
    vertexCount: 4,
    fragmentWGSL: redFragWGSL,
    fragmentTextureFormat: textureFormat,
    topology: 'triangle-strip',
  });

  // 生成したスプライトをコンテナへ登録
  engine.container.setSprite(sprite);

  // Move Top
  keyboardManager.keyDown([KeyCode.W], function () {
    sprite.offset.move(0, 0.1);
  });
  // Move Left
  keyboardManager.keyDown([KeyCode.A], function () {
    sprite.offset.move(-0.1, 0);
  });
  // Move Down
  keyboardManager.keyDown([KeyCode.S], function () {
    sprite.offset.move(0, -0.1);
  });
  // Move Right
  keyboardManager.keyDown([KeyCode.D], function () {
    sprite.offset.move(0.1, 0);
  });
}
