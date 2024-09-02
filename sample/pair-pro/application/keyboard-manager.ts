import { KeyCode } from './enums/key-code';

type EventListener = (ev: KeyboardEvent) => void;

/**
 * singleton class
 */
export class KeyboardManager {
  private static _instance: KeyboardManager;
  private constructor(private document: Document) {}

  static new(document: Document): KeyboardManager {
    if (this._instance === undefined) {
      this._instance = new KeyboardManager(document);
    }
    return this._instance;
  }

  static recreate(document: Document) {
    if (this._instance !== undefined) {
      delete this._instance;
    }
    return KeyboardManager.new(document);
  }

  get instance(): KeyboardManager {
    return KeyboardManager._instance;
  }

  keyDown(
    keyCodes: KeyCode[],
    callback: (ev: KeyboardEvent) => void
  ): EventListener {
    const listener = (ev: KeyboardEvent) => {
      if (keyCodes.some((v) => v === ev.code)) {
        callback(ev);
      }
    };

    this.document.addEventListener('keydown', listener);

    return listener;
  }

  removeEvent(type: 'keydown', listener: EventListener) {
    this.document.removeEventListener(type, listener);
  }
}
