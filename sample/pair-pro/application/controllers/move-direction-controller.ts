import { KeyCode } from '../enums/key-code';
import { KeyboardManager } from '../keyboard-manager';

export class MoveDirectionController {
  private constructor(private readonly keyboardManager: KeyboardManager) {}

  static new(keyboardManager: KeyboardManager): MoveDirectionController {
    return new MoveDirectionController(keyboardManager);
  }

  registerEvents() {
    // Top
    this.keyboardManager.keyDown([KeyCode.W], function () {});
    // Left
    this.keyboardManager.keyDown([KeyCode.A], function () {});
    // Down
    this.keyboardManager.keyDown([KeyCode.S], function () {});
    // Right
    this.keyboardManager.keyDown([KeyCode.D], function () {});
  }
}
