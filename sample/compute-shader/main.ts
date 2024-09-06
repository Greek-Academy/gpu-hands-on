import ComputeShaderWGSL from './shaders/compute.wgsl';
import {
  createComputePipeline,
  createInputBuffer,
  createOutputBuffer,
} from './utils';
import { render } from './view';

// NOTE: バッファへ書き込む際、1次元配列にする必要があるため flat() を使用
const lsv = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
].flat();

const rsv = [
  [12, 11, 10, 9],
  [8, 7, 6, 5],
  [4, 3, 2, 1],
].flat();

/**
 * 行列の和 を求める
 */
async function main() {
  const adapter = await navigator.gpu?.requestAdapter();
  const device = await adapter?.requestDevice();

  // シェーダーへ渡す値を、バッファへ書き込む
  const lsvInput = new Float32Array(lsv);
  const rsvInput = new Float32Array(rsv);

  const lsvInputBuffer = createInputBuffer(device, lsvInput);
  const rsvInputBuffer = createInputBuffer(device, rsvInput);

  device.queue.writeBuffer(lsvInputBuffer, 0, lsvInput);
  device.queue.writeBuffer(rsvInputBuffer, 0, rsvInput);

  // 計算結果を格納するためのバッファを事前に確保する
  const output = new Float32Array(Array(12).fill(0));
  const outputBuffer = createOutputBuffer(device, output);

  // パイプラインを作成して、バッファへアクセスできるようにする
  const computePipeline = createComputePipeline(device, ComputeShaderWGSL);

  const bindGroup = device.createBindGroup({
    layout: computePipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: lsvInputBuffer } },
      { binding: 1, resource: { buffer: rsvInputBuffer } },
      { binding: 2, resource: { buffer: outputBuffer } },
    ],
  });

  // 計算を実行するためのコマンドを準備する
  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginComputePass();
  passEncoder.setPipeline(computePipeline);
  passEncoder.setBindGroup(0, bindGroup);

  /**
   * 並列処理の宣言をする
   *
   * @var thread 12スレッドで実行
   * @var inputLength 引数の長さ = 計算回数
   * @var workgroups 実行回数 (thread / inputLength のグループ数だけ処理)
   */
  const thread = 12;
  const inputLength = 12;
  const workgroups = thread / inputLength;

  passEncoder.dispatchWorkgroups(workgroups);
  passEncoder.end();

  device.queue.submit([commandEncoder.finish()]);

  /**
   * 結果の受け取りに必要なメモリを算出する
   *
   * @var valueSizeInOutputs 計算結果の配列内の値1つ当たりに必要なメモリ数(byte)
   * @var outputSize 計算結果の受け取りに確保しておくメモリ数(byte)
   */
  const valueSizeInOutputs = 4; // Float32 = 4byte
  const outputSize = valueSizeInOutputs * output.length;

  const stagingBuffer = device.createBuffer({
    mappedAtCreation: false,
    size: outputSize,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  });

  // 結果が格納されている outputBuffer から stagingBuffer へ結果をコピーする
  const copyEncoder = device.createCommandEncoder();
  copyEncoder.copyBufferToBuffer(outputBuffer, 0, stagingBuffer, 0, outputSize);
  const copyCommands = copyEncoder.finish();
  device.queue.submit([copyCommands]);

  // 結果を取得
  await stagingBuffer.mapAsync(GPUMapMode.READ);
  const copyArrayBuffer = stagingBuffer.getMappedRange();
  const results = new Float32Array(copyArrayBuffer.slice(0));
  stagingBuffer.unmap();

  render(document, lsv.flat(), rsv.flat(), Array.from(results));
}

main();
