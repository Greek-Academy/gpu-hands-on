import {
  bootEngine,
  initCanvas,
  runAnimationFrame,
  setupKeyboardManager,
  setupWebGPUContext,
} from './application';
import { FrameActionHook, renderPlayerBlock } from './usecases';
import { SampleEveryFrameAction } from './usecases/frames/sample-every-frame-action';

async function main() {
  // ブラウザで WebGPU が使用できるか確認 & contextの取得
  const context = await setupWebGPUContext();

  // canvas 要素を GPU レンダリング用に取得
  const canvas = initCanvas(context.device, context.textureFormat);

  // framework を起動
  const engine = bootEngine(context.device);

  // keyboard manager の立ち上げ
  const keyboardManager = setupKeyboardManager();

  /*
   * ここまでが初期設定
   * ---------------------------------------------
   */

  // サンプル処理
  renderPlayerBlock(engine, context.textureFormat, keyboardManager);

  // 毎フレーム追加実行したい処理
  const hooks: FrameActionHook[] = [new SampleEveryFrameAction()];

  // フレームの描画処理
  runAnimationFrame({ engine, canvas }, hooks);
}

main();
