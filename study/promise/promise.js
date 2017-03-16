var _promise = function (param) {
    return new Promise(function (reslove, reject) {

        // 비동기를 표현하기 위해 setTimeout 함수를 사용
        window.setTimeout(function () {

            if (param) {
                // 해결됨
                resolve('Success !!!');
            } else {
                // 실패
                reject(Error('Fail !!!'));
            }
        }, 3000);
    });
};

// Promise 실행
_promise(true).then(function (text) {
    // 성공시
    console.log(text);
}, function (error) {
    // 실패시
    console.error(error);
});