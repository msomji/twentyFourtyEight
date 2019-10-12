import { Block } from "../models/block";

export const buildBlock: (n?: number) => Block = (value) => ({ isVisible: !!value, value : value || undefined } as Block)