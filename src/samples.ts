import triangle from '../sample/triangle/meta';
import square from '../sample/square/meta';
import pairPro from '../sample/pair-pro/meta';

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
    description: '簡単な図形を作成する',
    samples: {
      triangle,
      square,
    },
  },

  {
    title: 'Step 2',
    description: 'ペアプロで遊んでみる',
    samples: {
      pairPro,
    },
  },
];
