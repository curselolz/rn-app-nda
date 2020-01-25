export const searchFirstTwo = (data) => {
    let first = data[0],
        second = data[1]
    let result = first && second
        ? first + second
        : first && !second
            ? first
            : ''
    return result
}