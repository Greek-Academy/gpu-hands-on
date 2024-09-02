import {
  bootEngine,
  initCanvas,
  runAnimationFrame,
  setupKeyboardManager,
  setupWebGPUContext,
} from './application';
import {
  AfterHookCallback,
  BeforeHookCallback,
  renderPlayerBlock,
} from './usecases';

async function main() {
  // ブラウザで WebGPU が使用できるか確認 & contextの取得
  const context = await setupWebGPUContext();

  // canvas 要素を GPU レンダリング用に取得
  const canvas = initCanvas(context.device, context.textureFormat);

  // framework を起動
  const engine = bootEngine(context.device);

  // keyboard manager の立ち上げ
  setupKeyboardManager();

  /*
   * ここまでが初期設定
   * ---------------------------------------------
   */

  // フレーム描画処理で追加実行したい処理
  const beforeHooks: BeforeHookCallback[] = [renderPlayerBlock];
  const afterHooks: AfterHookCallback[] = [];

  const frameContext = {
    engine,
    canvas,
    textureFormat: context.textureFormat,
  };

  // フレームの描画処理
  runAnimationFrame(frameContext, { beforeHooks, afterHooks });
}

main();
