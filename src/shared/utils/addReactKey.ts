import { uniqueId } from "lodash";

// old
export const addReactKeyGenerated = <Type>(arr: Array<Type> | undefined) => {
  if (!arr) return [];
  // eslint-disable-next-line
  return arr.map((obj: Type) => ({
    // eslint-disable-next-line
    ...obj,
    key: uniqueId() as React.Key
  }));
};

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
