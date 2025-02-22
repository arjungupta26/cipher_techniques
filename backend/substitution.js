function substitutionEncrypt(text, key) {
    if (key.length !== 26) {
        return "Error: Key must be exactly 26 unique letters.";
    }

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    key = key.toUpperCase();
    let keySet = new Set(key);

    if (keySet.size !== 26) {
        return "Error: Key must contain 26 unique letters with no duplicates.";
    }

    let keyMap = {};
    for (let i = 0; i < 26; i++) {
        keyMap[alphabet[i]] = key[i];
    }

    let result = "";
    for (let char of text.toUpperCase()) {
        result += keyMap[char] || char; 
    }

    return result;
}
module.exports = substitutionEncrypt;