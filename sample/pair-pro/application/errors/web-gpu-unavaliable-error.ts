export class WebGPUUnavailableError extends Error {
  constructor(
    message: string = 'WebGPU support is missing or disabled in your browser'
  ) {
    super(message);
  }
}
