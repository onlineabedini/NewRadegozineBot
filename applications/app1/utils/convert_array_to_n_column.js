module.exports.convert_array_to_n_column = (array, n) => {
    const arr_items = Object.values(array);
    let arr = [];
    arr_items.forEach((item, index) => {
        if (Math.floor(index / n) >= arr.length) {
            arr.push([]);
        }
        arr[arr.length - 1].push(item);
    });
    return arr;
};
