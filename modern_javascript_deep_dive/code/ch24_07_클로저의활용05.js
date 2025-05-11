const counter = (function() {
  let counter = 0;

  return function(aux) {
    counter= aux(counter);
    return counter
  };
}());

//보조함수
function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

console.log(counter(increase));
console.log(counter(increase));
console.log(counter(increase));

console.log(counter(decrease));
console.log(counter(decrease));