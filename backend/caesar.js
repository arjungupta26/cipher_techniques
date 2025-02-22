function caesarCipher(text, shift) {
    let result = "";
    for (let char of text) {
        if (char.match(/[a-zA-Z]/)) {
            let base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            result += String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
        } 
        else result += char;
    }
    return result;
}
module.exports = caesarCipher;