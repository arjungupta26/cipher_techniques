function affineEncrypt(text, a, b) {
    let result = "";
    for (let char of text) {
        if (char.match(/[a-zA-Z]/)) {
            let base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            let newChar = ((a * (char.charCodeAt(0) - base) + b) % 26) + base;
            result += String.fromCharCode(newChar);
        } 
        else result += char;
    }
    return result;
}
module.exports = affineEncrypt;