function railFenceEncrypt(text, key) {
    if (key <= 1) return text;
    let rail = Array.from({ length: key }, () => []);
    let row = 0, down = true;

    for (let char of text) {
        rail[row].push(char);
        down ? row++ : row--;
        if (row === key - 1 || row === 0) down = !down;
    }
    return rail.flat().join("");
}
module.exports = railFenceEncrypt;