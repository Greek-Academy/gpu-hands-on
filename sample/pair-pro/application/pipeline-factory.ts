export class PipelineFactory {
  private constructor(private readonly device: GPUDevice) {}

  static new(device: GPUDevice): PipelineFactory {
    return new PipelineFactory(device);
  }

  create(
    vertex: GPUVertexState,
    fragment: GPUFragmentState,
    primitive: GPUPrimitiveState,
    layout: GPUPipelineLayout | 'auto' = 'auto',
    depthStencil?: GPUDepthStencilState,
    multisample?: GPUMultisampleState
  ) {
    return this.device.createRenderPipeline({
      layout,
      vertex,
      fragment,
      primitive,
      depthStencil,
      multisample,
    });
  }

  /**
   * @param vertexWGSL vertex を定義した wgslコード
   */
  buildVertexState(
    vertexWGSL: string,
    entryPoint: string = 'main'
  ): GPUVertexState {
    return {
      module: this.device.createShaderModule({
        code: vertexWGSL,
      }),
      entryPoint,
    };
  }

  /**
   * @param fragmentWGSL vertext を定義した wgslコード
   */
  buidlFragmentState(
    fragmentWGSL: string,
    targets: Iterable<GPUColorTargetState>,
    entryPoint: string = 'main'
  ): GPUFragmentState {
    return {
      module: this.device.createShaderModule({
        code: fragmentWGSL,
      }),
      targets,
      entryPoint,
    };
  }

  buildPrimitiveState(topology: GPUPrimitiveTopology): GPUPrimitiveState {
    return { topology };
  }
}
