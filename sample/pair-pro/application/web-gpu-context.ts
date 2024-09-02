/**
 * singleton class
 */
export class WebGPUContext {
  private static _instance: WebGPUContext;

  private constructor(
    public readonly adapter: GPUAdapter,
    public readonly device: GPUDevice,
    public readonly textureFormat: GPUTextureFormat
  ) {}

  static new(
    adapter: GPUAdapter,
    device: GPUDevice,
    textureFormat: GPUTextureFormat
  ): WebGPUContext {
    if (this._instance === undefined) {
      this._instance = new WebGPUContext(adapter, device, textureFormat);
    }
    return this._instance;
  }

  static recreate(
    adapter: GPUAdapter,
    device: GPUDevice,
    textureFormat: GPUTextureFormat
  ): WebGPUContext {
    if (this._instance !== undefined) {
      delete this._instance;
    }
    return WebGPUContext.new(adapter, device, textureFormat);
  }

  get instance(): WebGPUContext {
    return WebGPUContext._instance;
  }
}
