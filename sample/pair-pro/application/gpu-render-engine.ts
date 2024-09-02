import { Offset } from '../domain/entities/offset';
import { PipelineFactory } from './pipeline-factory';
import { Sprite } from '../domain/entities/sprite';
import { SpriteContainer } from '../usecases/sprite-container';
import { GPURenderContext } from './gpu-render-context';

type PipelineState = {
  vertexWGSL: string;
  fragmentWGSL: string;
  fragmentTextureFormat: GPUTextureFormat;
  topology: GPUPrimitiveTopology;
};

export class GPURenderEngine {
  private constructor(
    public readonly device: GPUDevice,
    public readonly container: SpriteContainer,
    public readonly factory: PipelineFactory
  ) {}

  static new(device: GPUDevice) {
    const factory = PipelineFactory.new(device);
    const container = SpriteContainer.new();

    return new GPURenderEngine(device, container, factory);
  }

  /**
   * スプライト作成用のヘルパーメソッド
   *
   * より詳細にカスタマイズしたい場合は
   * this.factory を使うか、独自に各 State を定義して createRenderPipline を呼び出してください
   * @see https://zenn.dev/emadurandal/books/cb6818fd3a1b2e/viewer/hello_triangle
   *
   * @param {PipelineState} pipelineState
   * @param {string} pipelineState.vertexWGSL vertex の wgslコード (entryPoint: main)
   * @param {string} pipelineState.fragmentWGSL fragment の wgslコード (entryPoint: main)
   * @param {GPUTextureFormat} pipelineState.textureFormat fragment の カラーフォーマット
   * @param {GPUPrimitiveTopology} pipelineState.topology プリミティブ・トポロジ
   */
  createSprite(
    {
      vertexWGSL,
      fragmentWGSL,
      fragmentTextureFormat,
      topology,
    }: PipelineState,
    x: number = 0,
    y: number = 0
  ) {
    const vertex = this.factory.buildVertexState(vertexWGSL);
    const fragment = this.factory.buidlFragmentState(fragmentWGSL, [
      { format: fragmentTextureFormat },
    ]);
    const primitive = this.factory.buildPrimitiveState(topology);
    const pipeline = this.factory.create(vertex, fragment, primitive);
    const offset = Offset.new(x, y);

    return Sprite.new(pipeline, offset);
  }

  /**
   * SpriteContainer に格納したすべての Spriteをレンダリングする処理
   */
  render(context: GPURenderContext) {
    for (const sprite of this.container.sprites) {
      this.renderSprite(context, sprite);
    }
  }

  private renderSprite(context: GPURenderContext, sprite: Sprite) {
    const passEncoder = context.beginRenderPass();

    this.bindSpriteOffset(passEncoder, sprite);
    passEncoder.setPipeline(sprite.pipeline);
    passEncoder.draw(4, 4);
    passEncoder.end();
  }

  private bindSpriteOffset(
    passEncoder: GPURenderPassEncoder,
    sprite: Sprite,
    bindGroupIndex: number = 0
  ) {
    const offsetData = new Float32Array([sprite.offset.x, sprite.offset.y]);

    const buffer = this.device.createBuffer({
      size: offsetData.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    this.device.queue.writeBuffer(buffer, 0, offsetData);

    const bindGroup = this.device.createBindGroup({
      layout: sprite.pipeline.getBindGroupLayout(bindGroupIndex),
      entries: [
        {
          binding: bindGroupIndex,
          resource: { buffer },
        },
      ],
    });

    passEncoder.setBindGroup(bindGroupIndex, bindGroup);
  }

  /**
   * 記録が完了したスクリーン情報をキューへ格納する
   */
  submitQueue(commandBuffers: Iterable<GPUCommandBuffer>) {
    this.device.queue.submit(commandBuffers);
  }
}
