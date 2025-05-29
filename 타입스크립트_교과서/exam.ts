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