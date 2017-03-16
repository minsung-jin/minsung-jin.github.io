var myFunc = function (param) {
    if (!myFunc.cache[param]) {
        var result = {};
        myFunc.cache[param] = result;
    }
    console.log(myFunc.cache);
    return myFunc.cache[param];
};

myFunc.cache = {};

var memoization = myFunc('memoization');