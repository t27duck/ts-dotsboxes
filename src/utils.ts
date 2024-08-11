export const DEFAULT_SIZE = 8;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const times = (n: number) => (f: Function) => {
  const iter = (i: number) => {
    if (i === n) return;
    f(i);
    iter(i + 1);
  };
  return iter(0);
};
