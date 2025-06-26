declare namespace NS {
   const v: string;
}

declare enum Enum {
  ADMIN = 1
}

declare function func(param:number) : string;
declare const variable:number;
declare class C {
  constructor(p1:string, p2:string);
}

new C(func(variable),NS.v);