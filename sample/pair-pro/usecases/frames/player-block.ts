import blockVertWGSL from '../../shaders/block.vert.wgsl';
import redFragWGSL from '../../shaders/red.frag.wgsl';
import { GPURenderEngine } from '../../application/gpu-render-engine';

export function renderPlayerBlock(
  engine: GPURenderEngine,
  textureFormat: GPUTextureFormat
) {
  // スプライトの生成
  const sprite = engine.createSprite({
    vertexWGSL: blockVertWGSL,
    fragmentWGSL: redFragWGSL,
    fragmentTextureFormat: textureFormat,
    topology: 'triangle-strip',
  });

  // 生成したスプライトをコンテナへ登録
  engine.container.setSprite(sprite);
}
