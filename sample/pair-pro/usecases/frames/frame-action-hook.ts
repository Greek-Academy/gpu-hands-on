/**
 * 毎フレームで実行したい処理
 */
export interface FrameActionHook {
  execute(): void;
}
