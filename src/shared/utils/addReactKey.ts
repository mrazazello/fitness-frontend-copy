export const addReactKeyByProperty = <Type>(
  arr: Array<Type> | undefined,
  key: keyof Type
) => {
  if (!arr) return [];

  return arr.map((obj: Type) => ({
    ...obj,
    key: obj[key] as React.Key
  }));
};
