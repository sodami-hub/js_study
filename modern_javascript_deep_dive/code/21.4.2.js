/*
encodeURI / decodeURI
인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다.
이스케이프 처리는 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것이다.

전달받은 문자열을 완전한 URI로 간주 쿼리 스트링 구분자로 사용되는 =,?,&를 인코딩하지 않는다.
 */

const uri = 'http://sodami.com?name=이소담&job=student&daughter';

const enc = encodeURI(uri);
console.log(enc);

const dec = decodeURI(enc);
console.log(dec);

/*
encodeURIComponent / decodeURIComponent
URI의 구성요소를 인수로 전달받아 인코딩한다.

전달받은 문자열을 URI의 구성요소인 쿼리 스트링의 일부로 간주하고 쿼리 스트링의 구분자로 사용되는 =, ?, & 까지 인코딩한다.
 */
const uriComp = 'name=이소담&job=student&daughter'

let enc02 = encodeURIComponent(uriComp);
console.log(enc02);

let dec02 = decodeURIComponent(enc02);
console.log(dec02);