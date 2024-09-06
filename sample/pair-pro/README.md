# GPU Hands-On Framework の 使い方

下記を参考に、実装してみてください  
ハンズオン用に用意した簡易フレームワークのため、一部自由度を犠牲にしている部分があります  
拡張したい場合は、自由にカスタマイズしてください  

## 大元の処理
```
sample/pair-pro/main.ts
```

- 初期設定後に処理を記述してください

### 毎フレーム実行する処理を追加

hooks に FrameActionHook を割り当てたクラスを登録することで、毎フレーム実行したい処理を登録できます

```ts
// 毎フレーム追加実行したい処理
const hooks: FrameActionHook[] = [new SampleEveryFrameAction()];
```

```ts
// usecases/frames/sample-every-frame-action.ts
import { FrameActionHook } from './frame-action-hook';

export class SampleEveryFrameAction implements FrameActionHook {
  execute(): void {
    console.log('Called `SampleEveryFrameAction` class');
  }
}

```

## スプライトの操作

- スプライトの作成
- スプライトの描画
- スプライトの座標変更

### スプライトの作成

```ts
const x = 0; // x座標
const y = 0; // y座標

const state = {
    vertexWGSL: '※ vertex を宣言した wgsl コード',
    vertexCount: 4, // グラフ次数（ex: 3角形は`3`, triangle-stripの4角形は`4`）
    fragmentWGSL: '※ fragment を宣言した wgsl コード',
    fragmentTextureFormat: textureFormat, // 固定
    /**
     * 参照: プリミティブ・トポロジについて
     * @see https://gamesgard.com/directx11_lesson04/
     */
    topology: 'triangle-strip',
};

/**
 * @var {GPURenderEngine} engine
 * @var {Sprite} sprite
 */
const sprite = engine.createSprite(state, x, y);
```

### スプライトの描画

作成したスプライトをコンテナに登録することで、レンダリングされる。

```ts
/**
 * @var {GPURenderEngine} engine
 * @var {Sprite} sprite
 */
engine.container.setSprite(sprite);
```

### スプライトの座標変更

```ts
const x = 0.1;
const y = 0.1;

/**
 * 右上に移動する
 * @var {Sprite} sprite
 */
sprite.offset.move(x, y);
```
