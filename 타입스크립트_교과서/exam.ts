enum Money {
  WON,
}
enum Liter {
  LITER,
}

interface M {
  type: Money.WON,
}
interface L {
  type: Liter.LITER,
}

function moneyOrLiter(param:M|L) {
  if (param.type === Money.WON) {
    console.log('Money')
    return param;
  } else {
    console.log('Liter')
    return param;
  }
}
moneyOrLiter({type: Money.WON})  // Money
moneyOrLiter({type: Liter.LITER})  // Money
