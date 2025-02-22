const caesarCipher = require("./caesar");

function rot13(text) {
    return caesarCipher(text, 13); 
}
module.exports = rot13;