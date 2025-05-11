const myproto = {x:10};

const obj = {
    y:20,
    __proto__ : myproto
};
/* 위 코드는 아래와 동일하다.
const obj = Object.create(myproto,{
    y: {value:20, writable:true, configurable:true, enumerable:true}
});
*/

