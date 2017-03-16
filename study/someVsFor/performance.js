// 기본값 세팅
var a = [];
var t = 0;
for (var i = 1 ; i <= 1000000 ; i++) { a.push(i); }

// for의 시간측정
t = new Date().getTime();
for (var i = 0 ; i < a.length ; i++)
{
    if (a[i] == 1000000) {  console.log('done'); }
}
console.log('f1-time : ' + (new Date().getTime() - t));

// for의 시간측정 : 내부가 비어있을때.
t = new Date().getTime();
for (var i = 0 ; i < a.length ; i++) {}
console.log('f2-time : ' + (new Date().getTime() - t));


// some의 시간측정 : done를 넣은건 함수를 인자로 넣다보니.. 혹시 쓰레드로 돌지 않을까 라는 생각에 넣어본겁니다.
// 자바스크립트에선 new 하는것들은 죄다 쓰레드로 돌고, 몇몇 네이티브는 쓰레드로 돌아서... 혹시나 하는 마음에....
t = new Date().getTime();
a.some(function(e)
       {
    if (e == 1000000) {  console.log('done'); }
});
console.log('s1-time : ' + (new Date().getTime() - t));

// some의 시간측정 : 내부가 비어있을때.
t = new Date().getTime();
a.some(function(e){});
console.log('s2-time : ' + (new Date().getTime() - t));


// reduce의 시간측정 : done를 넣은건 some과 마찬가지..이유.
t = new Date().getTime();
a.reduce(function(d, e)
         {
    if (e == 1000000) {  console.log('done'); }
});
console.log('r1-time : ' + (new Date().getTime() - t));

// reduce의 시간측정 : 내부가 비어있을때.
t = new Date().getTime();
a.reduce(function(d, e){});
console.log('r2-time : ' + (new Date().getTime() - t));