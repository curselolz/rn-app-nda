import DOMParser from 'react-native-html-parser';

export const htmlParser = (html) => {
    let ParsedString = html
    if (ParsedString) {
        const parser = new DOMParser.DOMParser();
        const parsed = parser.parseFromString(html, 'text/html');
        if (parsed.firstChild.firstChild && parsed.firstChild.firstChild.nodeValue) {
            ParsedString = parsed.firstChild.firstChild.nodeValue
        }
    }
    return ParsedString
}