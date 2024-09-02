import { quitIfWebGPUNotAvailable } from '../../util';
import { Canvas } from './canvas';
import { GPURenderContext } from './gpu-render-context';
import { GPURenderEngine } from './gpu-render-engine';
import { KeyboardManager } from './keyboard-manager';
import { WebGPUContext } from './web-gpu-context';

/**
 * WebGPU を使用するために必要な context の取得
 */
export async function setupWebGPUContext(): Promise<WebGPUContext> {
  const adapter = await navigator.gpu?.requestAdapter();
  const device = await adapter?.requestDevice();

  quitIfWebGPUNotAvailable(adapter, device);

  const textureFormat = navigator.gpu.getPreferredCanvasFormat();

  return WebGPUContext.new(adapter, device, textureFormat);
}

/**
 * HTML上のcanvas要素を読み込んで
 * GPUレンダリングをするための初期設定を行う処理
 *
 * @todo ハンズオン用に一部設定値をハードコーディングしているため
 *       再利用性を上げる場合は引数拡張等で対応してください
 */
export function initCanvas(device: GPUDevice, format: GPUTextureFormat) {
  const canvas = Canvas.new(document, 'canvas');
  const { devicePixelRatio } = window;

  canvas.resizeFitToDevice(devicePixelRatio);
  canvas.configure({
    device,
    format,
    alphaMode: 'premultiplied',
  });

  return canvas;
}

/**
 * レンダリングを包括するframeworkの起動
 */
export function bootEngine(device: GPUDevice) {
  return GPURenderEngine.new(device);
}

/**
 * フレームの描画で使用するための context を生成する処理
 * CommandEncoder と RenderPassDescripter は Queue へ格納後は使い回し不可
 *
 * @todo ハンズオン用に一部設定値をハードコーディングしているため
 *       再利用性を上げる場合は引数拡張等で対応してください
 */
export function setupRenderContext(device: GPUDevice, canvas: Canvas) {
  const encoder = device.createCommandEncoder();
  const view = canvas.context.getCurrentTexture().createView();
  const descripter: GPURenderPassDescriptor = {
    colorAttachments: [
      {
        view,
        clearValue: [0, 0, 0, 1],
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  };

  return GPURenderContext.new(encoder, descripter);
}

/**
 * キーボード入力の管理
 */
export function setupKeyboardManager(): KeyboardManager {
  return KeyboardManager.new(document);
}
