import { triangleMeta } from '../sample/triangle/meta';
import { squareMeta } from '../sample/square/meta';
import { computeShaderMeta } from '../sample/compute-shader/meta';
import { pairProMeta } from '../sample/pair-pro/meta';

export type SourceInfo = {
  path: string;
};

export type SampleInfo = {
  name: string;
  tocName?: string;
  description: string;
  openInNewTab?: boolean;
  filename: string; // used if sample is local
  url?: string; // used if sample is remote
  sources: SourceInfo[];
};

type PageCategory = {
  title: string;
  description: string;
  samples: { [key: string]: SampleInfo };
};

export const pageCategories: PageCategory[] = [
  {
    title: 'Step 1',
    description: '図形を作成する',
    samples: {
      Triangle: triangleMeta,
      Square: squareMeta,
    },
  },
  {
    title: 'Step 2',
    description: 'GPUで計算する',
    samples: {
      'Compute Shader': computeShaderMeta,
    },
  },
  {
    title: 'Step 3',
    description: '[ペアプロ] WebGPUを使ってみる',
    samples: {
      'Pair Programing': pairProMeta,
    },
  },
];
