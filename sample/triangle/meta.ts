export const triangleMeta = {
  name: 'Triangle',
  description: '三角形を描画する',
  filename: __DIRNAME__,
  sources: [
    { path: 'main.ts' },
    { path: './shaders/triangle.vert.wgsl' },
    { path: './shaders/red.frag.wgsl' },
  ],
};
