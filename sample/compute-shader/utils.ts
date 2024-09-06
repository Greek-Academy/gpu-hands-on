export function createInputBuffer(
  device: GPUDevice,
  input: Float32Array
): GPUBuffer {
  return device.createBuffer({
    size: input.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
}

export function createOutputBuffer(
  device: GPUDevice,
  output: Float32Array
): GPUBuffer {
  return device.createBuffer({
    size: output.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
  });
}

export function createComputePipeline(
  device: GPUDevice,
  computeShader: string,
  entryPoint: string = 'main'
): GPUComputePipeline {
  const module = device.createShaderModule({
    code: computeShader,
  });

  return device.createComputePipeline({
    layout: 'auto',
    compute: { module, entryPoint },
  });
}
