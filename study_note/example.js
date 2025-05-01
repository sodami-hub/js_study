const foo =() => {
    throw new Error('foo 에서 발생한 에러')
}
const bar = () => {
    foo()
}
const baz = () => {
    bar()
}

try {
    baz();
}catch(err) {
    console.log(err)
}