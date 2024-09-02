export class WebGPUContext {
  private constructor(
    public readonly adapter: GPUAdapter,
    public readonly device: GPUDevice,
    public readonly textureFormat: GPUTextureFormat
  ) {}

  static new(
    adapter: GPUAdapter,
    device: GPUDevice,
    textureFormat: GPUTextureFormat
  ) {
    return new WebGPUContext(adapter, device, textureFormat);
  }
}
