const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const encryptions = require("./backend"); 

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend")));

app.post("/encrypt", (req, res) => {
    const { text, type, shift, key, keyMatrix, a, b } = req.body;

    if (!text) return res.status(400).json({ error: "Text is required" });

    if (!encryptions[type]) return res.status(400).json({ error: "Invalid encryption type" });

    let encryptedText;

    if (type === "caesar") {
        if (isNaN(shift) || shift < 1) {
            return res.status(400).json({ error: "Caesar Cipher requires a valid shift value (≥1)." });
        }
        encryptedText = encryptions.caesar(text, parseInt(shift));
    } 
    else if (type === "rot13") {
        encryptedText = encryptions.rot13(text);
    } 
    else if (type === "railfence") {
        if (!key || isNaN(key) || key < 2) {
            return res.status(400).json({ error: "Rail Fence Cipher requires a numeric key (≥2)." });
        }
        encryptedText = encryptions.railfence(text, parseInt(key));
    } 
    else if (type === "columnar") {
        if (!key) {
            return res.status(400).json({ error: "Columnar Transposition Cipher requires a key." });
        }
        encryptedText = encryptions.columnar(text, key);
    } 
    else if (type === "hill") {
        if (!keyMatrix) {
            return res.status(400).json({ error: "Hill Cipher requires a key matrix." });
        }

        try {
            let parsedMatrix = keyMatrix
                .split(";") // Split rows by ";"
                .map(row => row.split(",").map(Number)); 

            encryptedText = encryptions.hill(text, parsedMatrix);
        } catch (error) {
            return res.status(400).json({ error: "Invalid key matrix format." });
        }
    } 
    else if (type === "affine") {
        if (isNaN(a) || isNaN(b)) {
            return res.status(400).json({ error: "Affine Cipher requires numeric 'a' and 'b' values." });
        }
        encryptedText = encryptions.affine(text, parseInt(a), parseInt(b));
    } 
    else if (type === "substitution") {
        if (!key || key.length !== 26 || new Set(key.toUpperCase()).size !== 26) {
            return res.status(400).json({ error: "Substitution Cipher requires a 26-letter unique key." });
        }
        encryptedText = encryptions.substitution(text, key.toUpperCase());
    } 
    else {
        return res.status(400).json({ error: "Invalid encryption type" });
    }

    res.json({ encrypted: encryptedText });
});

app.listen(PORT, () => console.log(`✅ Server running at: http://localhost:${PORT}`));
