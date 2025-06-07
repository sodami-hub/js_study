type Add01 = (x:number, y:number) => number;
type Add02 = (x:string, y:string) => string;
type Add = Add01 & Add02;
const add:Add = (x:any,y:any)=>x+y;