export function findById<T extends { id: K }, K>(entities: T[], id: K): T | undefined {
  return entities.find((entity) => entity.id === id);
}

export function findBy<T extends { [idx: string]: K }, K>(entities: T[], key: string, value: K): T[] {
  return entities.filter((entity) => entity[key] === value);
}

export function treeDepth<T extends { id: K; parentId?: K }, K>(entities: T[], leaf: T, depth: number = 0): number {
  if (!leaf.parentId) {
    return depth;
  } else {
    const parent = findById(entities, leaf.parentId as K)!;

    return treeDepth(entities, parent, depth + 1);
  }
}

export function replaceAtIndex<T>(array: T[], index: number, value: T): T[] {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}

export function removeAtIndex<T>(array: T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function payloadToEncodedLink(payload: Record<string, string | string[]>, queryParam = 'e'): string {
  return `${queryParam}=${btoa(JSON.stringify(payload))}`;
}

export function formDataToUrlParams(formData: FormData) {
  const data = [...formData.entries()];

  return data
    .map((entry) => {
      if (data.filter((x) => x[0] === entry[0]).length > 1) {
        // doppelt
        return `${encodeURIComponent(entry[0])}[]=${encodeURIComponent(entry[1] as string)}`;
      } else {
        return `${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1] as string)}`;
      }
    })
    .join('&');
}
