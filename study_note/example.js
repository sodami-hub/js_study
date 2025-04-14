const arrayLike = {
    0:1,
    1:2,
    2:3,
    length:3
};

// 유사 배열 객체는 length 프로퍼티를 갖기 때문에 for 문으로 순회 가능
for (let i = 0; i< arrayLike.length; i++) {
    console.log(arrayLike[i]);
}

// 이터러블이 아니기 때문에 for...of 문 사용 불가
for (const item of arrayLike) {
    console.log(item)
}