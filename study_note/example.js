const obj = {
    [Symbol.for('my')] : 1
};

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(my)]

const symbolKey = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolKey]);