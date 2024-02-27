export function removeDuplicates(array, compare) {
    const result = array.slice();
    result.sort(compare);
    return result.filter((val, index, tmp) => {
        if (index === 0)
            return true;
        return compare(tmp[index - 1], val) != 0;
    });
}
