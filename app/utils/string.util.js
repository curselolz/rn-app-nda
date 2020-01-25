export const capitalize = (str) => {
    return str.toString().replace(/\b\w/g, l => l.toUpperCase())
}
export const serverize = (str) => {
    return str.toString().toLowerCase().replace(/ /g, '_')
}