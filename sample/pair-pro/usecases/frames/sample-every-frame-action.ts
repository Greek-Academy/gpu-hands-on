import { FrameActionHook } from './frame-action-hook';

export class SampleEveryFrameAction implements FrameActionHook {
  execute(): void {
    console.log('Called `SampleEveryFrameAction` class');
  }
}
