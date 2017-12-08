export interface Test2 {
  a: number;
  b: number;
}

export function test2(a: number, b: number): Test2 {
  return {
    a,
    b,
  };
}
