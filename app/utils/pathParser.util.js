export const pathParser = (path) => {
    let count = path.match(/\./g).length
    return count
}