// eslint-disable-next-line @typescript-eslint/ban-types
export const times = (n: number) => (f: Function) => {
  const iter = (i: number) => {
    if (i === n) return;
    f(i);
    iter(i + 1);
  };
  return iter(0);
};
