// this isn't the best implementation and may not scale
// for production i recommend using one of the battle-tested libraries (e.g. react, svelte or vue).

import { isEqual } from "lodash";

interface Cached {
  key: any;
  elem: HTMLElement;
}

export default class ElemMap {
  private node: HTMLElement;
  private mapFunc: (item: any, index: number) => HTMLElement;
  private keyFunc: (item: any, index: number) => any;

  private cache: Cached[] = [];

  update(data: any[]) {
    this.node.innerText = "";
    const newCache: Cached[] = [];

    data.forEach((item, i) => {
      const key = this.keyFunc(item, i);

      let cachedElem: HTMLElement;
      for (const cached of this.cache) {
        if (isEqual(key, cached.key)) {
          cachedElem = cached.elem;
          break;
        }
      }

      if (cachedElem) {
        console.log("retrieved from cache");
        newCache.push({ key, elem: cachedElem });
        this.node.appendChild(cachedElem);
      } else {
        const elem = this.mapFunc(item, i);
        newCache.push({ key, elem });
        this.node.appendChild(elem);
      }
    });

    this.cache = newCache;
  }

  constructor(
    node: HTMLElement,
    mapFunc: (item: any, index: number) => HTMLElement,
    keyFunc?: (item: any, index: number) => any
  ) {
    this.node = node;
    this.mapFunc = mapFunc;
    this.keyFunc = keyFunc !== undefined ? keyFunc : (item) => ({ ...item });
  }
}
