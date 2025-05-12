type Hello = Record<'hello' | 'hi',string>

const hello:Hello = {
  hello : 'Hello',
  hi: 'Hi'
}

Object.keys(hello).map(key => {
  const value = (hello[key]);
  console.log(value)
})