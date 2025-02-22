const math = require("mathjs");
function hillCipherEncrypt(text, keyMatrix) {
    text = text.replace(/\s+/g, "").toUpperCase(); 
    let m = keyMatrix.length;
    let numericText = text.split("").map(char => char.charCodeAt(0) - 65);
    while (numericText.length % m !== 0) {
        numericText.push(25); 
    }
    let cipherText = "";
    for (let i = 0; i < numericText.length; i += m) {
        let block = numericText.slice(i, i + m); 
        let result = math.multiply(keyMatrix, block).map(x => x % 26);
        cipherText += result.map(num => String.fromCharCode(num + 65)).join("");
    }
    return cipherText;
}
module.exports = hillCipherEncrypt;