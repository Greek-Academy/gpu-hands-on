export class Canvas {
  static readonly webgpuContextId: 'webgpu' = 'webgpu';

  private constructor(
    public readonly element: HTMLCanvasElement,
    public readonly context: GPUCanvasContext
  ) {}

  static new(document: Document, selector: string): Canvas {
    const element = document.querySelector<HTMLCanvasElement>(selector);
    if (element === null) {
      throw new Error('指定された要素が見つかりませんでした');
    }

    const context = element.getContext(Canvas.webgpuContextId);
    if (context === null) {
      throw new Error(
        'WebGPU がご利用のブラウザでサポートされていないか、設定で無効になっています'
      );
    }

    return new Canvas(element, context);
  }

  resizeFitToDevice(devicePixelRatio: number) {
    this.element.width = this.element.clientWidth * devicePixelRatio;
    this.element.height = this.element.clientHeight * devicePixelRatio;
  }

  configure(configuration: GPUCanvasConfiguration) {
    this.context.configure(configuration);
  }
}
