function columnarEncrypt(text, key) {
    text = text.replace(/\s+/g, "").toUpperCase();  
    let keyLength = key.length;
    let columns = Array.from({ length: keyLength }, () => []); 
    for (let i = 0; i < text.length; i++) {
        columns[i % keyLength].push(text[i]);
    }
    let sortedKey = key.split("").map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char));  

    let cipherText = "";
    for (let { index } of sortedKey) {
        cipherText += columns[index].join("");  
    }
    return cipherText;
}
module.exports = columnarEncrypt;