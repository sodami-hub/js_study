interface Original {
  name: string;
  age: number;
  married: boolean;
}
type Copy = {
  readonly [key in keyof Original]? : Original[key]; // Initial type : {name: string, age: number, married: boolean}
}