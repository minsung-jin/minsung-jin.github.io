var man = {
    hands: 2,
    legs: 2,
    head: 1
};

for (var i in man) {
    if (man.hasOwnProperty(i)) {
        console.log(i, ':', man[i]);
    }
}