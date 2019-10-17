import { Block } from "./models/block";


export const buildBlock: (n?: number) => Block = (value) => ({ isVisible: !!value, value : value || undefined } as Block)

// ES6
export const flatten: (list: Block[]) => Block[] = list => list.reduce(
  (a: Block[], b: Block | Block[]) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);