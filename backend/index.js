const caesarCipher = require("./caesar");
const rot13 = require("./rot13");
const railFenceEncrypt = require("./railfence");
const columnarEncrypt = require("./columnar");
const hillCipherEncrypt = require("./hill");
const affineEncrypt = require("./affine");
const substitutionEncrypt = require("./substitution");

module.exports = {
    caesar: caesarCipher,
    rot13: rot13,
    railfence: railFenceEncrypt,
    columnar: columnarEncrypt,
    hill: hillCipherEncrypt,
    affine: affineEncrypt,
    substitution: substitutionEncrypt
};
