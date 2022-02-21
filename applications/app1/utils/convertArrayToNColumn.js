module.exports.convertArrayToNColumn = (array, n) => {
    const arrItems = Object.values(array);
    let arr = [];
    arrItems.forEach((item, index) => {
        if (Math.floor(index / n) >= arr.length) {
            arr.push([]);
        }
        arr[arr.length - 1].push(item);
    });
    return arr;
};
