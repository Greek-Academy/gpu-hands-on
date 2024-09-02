import { GPURenderEngine } from '../../application/gpu-render-engine';

/**
 * レンダリング前に呼び出されるコールバック関数
 *
 * - ex: Sprite の描画などを実施する
 */
export interface BeforeHookCallback {
  (engine: GPURenderEngine, textureFormat: GPUTextureFormat): void;
}

/**
 * レンダリング後に呼び出されるコールバック関数
 * ※ Sprite の生成処理を実行しても、描画されないため注意
 *
 * - ex: レンダリングされた Sprite の操作処理
 */
export interface AfterHookCallback {
  (engine: GPURenderEngine): void;
}
