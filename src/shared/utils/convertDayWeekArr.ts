// convert 0 is Sunday in JS to 7 is Sunday in Backend
export default (arr: string[]): string[] => {
  return arr.map((el) => (el === "0" ? "7" : el));
};
