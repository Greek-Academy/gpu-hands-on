import { UndefinedElementError, WebGPUUnavailableError } from './errors';

/**
 * singleton class
 * ※ もし複数の canvas を管理したい場合は、singleton の記述を削除してください
 */
export class Canvas {
  private static _instance: Canvas;
  static readonly webgpuContextId: 'webgpu' = 'webgpu';

  private constructor(
    public readonly element: HTMLCanvasElement,
    public readonly context: GPUCanvasContext
  ) {}

  static new(document: Document, selector: string): Canvas {
    if (this._instance === undefined) {
      const element = document.querySelector<HTMLCanvasElement>(selector);
      if (element === null) {
        throw new UndefinedElementError(
          `Element not found [selector: ${selector}]`
        );
      }

      const context = element.getContext(Canvas.webgpuContextId);
      if (context === null) {
        throw new WebGPUUnavailableError();
      }

      this._instance = new Canvas(element, context);
    }

    return this._instance;
  }

  static recreate(document: Document, selector: string): Canvas {
    if (this._instance !== undefined) {
      delete this._instance;
    }
    return Canvas.new(document, selector);
  }

  get instance(): Canvas {
    return Canvas._instance;
  }

  resizeFitToDevice(devicePixelRatio: number) {
    this.element.width = this.element.clientWidth * devicePixelRatio;
    this.element.height = this.element.clientHeight * devicePixelRatio;
  }

  configure(configuration: GPUCanvasConfiguration) {
    this.context.configure(configuration);
  }
}
