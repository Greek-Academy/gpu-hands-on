export class GPURenderContext {
  private constructor(
    private readonly encoder: GPUCommandEncoder,
    private readonly descriptor: GPURenderPassDescriptor
  ) {}

  static new(
    encoder: GPUCommandEncoder,
    descriptor: GPURenderPassDescriptor
  ): GPURenderContext {
    return new GPURenderContext(encoder, descriptor);
  }

  beginRenderPass(): GPURenderPassEncoder {
    return this.encoder.beginRenderPass(this.descriptor);
  }

  completeRecording(): GPUCommandBuffer {
    return this.encoder.finish();
  }
}
