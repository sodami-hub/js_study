const tuple: [number, boolean?,string?] = [1,false, 'hi'];
const a:{hello: string} = JSON.parse('{"hello":"json"}');
console.log(a);
const sym = Symbol.for('hello');

try {

} catch (e) {
  const error = e as Error;
  console.log(error.message)
}

const func:()=>void= ()=>3;
const value = func();

const func2 = ():void => {
  const person = {name:'lee'};
};

const func3:()=>void = ()=>{
  const p = 3;
}

interface Person {
  name: string;
  age: number;
  married: boolean;
}

const man:Person = {
  name:'lee',
  age:12,
  married:true,
}

interface Func {
  (x:number, y:number):number;
}
const add:Func=(x,y)=>x+y;

interface Arr {
  length:number;
  [key:number]:number;
}
const arr:Arr =[1,2,3,4,5];
console.log(arr.length);

const arr2:Array<number> = [1,2,3,4,5];

interface Merge {
  one: string;
}
interface Merge {
  two: number
}

const exam:Merge = {
  one:'1',
  two:2,
}

console.log(exam);

namespace Example {
  export interface Inner {
    test:string;
  }
  export type test2=number;
}

const ex01:Example.Inner= {
  test:'str'
}
const ex02:Example.test2 = 123;





























