function toggleInputs() {
    let type = document.getElementById("encryptionType").value;

    document.getElementById("shiftContainer").style.display = (type === "caesar") ? "block" : "none";
    document.getElementById("keyContainer").style.display = (type === "railfence" || type === "columnar" || type === "substitution") ? "block" : "none";
    document.getElementById("matrixContainer").style.display = (type === "hill") ? "block" : "none";
    document.getElementById("affineContainer").style.display = (type === "affine") ? "block" : "none";
}

function encryptText() {
    let text = document.getElementById("plaintext").value.trim();
    let type = document.getElementById("encryptionType").value;
    let requestData = { text, type };

    if (!text) {
        alert("❌ Error: Please enter some text to encrypt.");
        return;
    }

    if (type === "caesar") {
        let shift = parseInt(document.getElementById("shift").value);
        if (isNaN(shift) || shift < 1) {
            alert("❌ Error: Caesar Cipher requires a valid shift value (≥1).");
            return;
        }
        requestData.shift = shift;
    }

    if (type === "railfence") {
        let key = document.getElementById("key").value;
        if (!/^\d+$/.test(key) || parseInt(key) < 2) {
            alert("❌ Error: Rail Fence Cipher requires a numeric key (≥2).");
            return;
        }
        requestData.key = parseInt(key);
    }

    if (type === "columnar") {
        let key = document.getElementById("key").value.trim().toUpperCase();
        if (!/^[A-Z]+$/.test(key)) {
            alert("❌ Error: Columnar Transposition Cipher key must contain only letters (A-Z).");
            return;
        }
        requestData.key = key;
    }

    if (type === "hill") {
        let matrixInput = document.getElementById("matrix").value.trim();
        if (!/^(\d+(,\d+)*;)*\d+(,\d+)*$/.test(matrixInput)) {
            alert("❌ Error: Hill Cipher requires a valid numeric matrix in 'row1;row2;row3' format.");
            return;
        }
        requestData.keyMatrix = matrixInput;
    }

    if (type === "substitution") {
        let key = document.getElementById("key").value.trim().toUpperCase();
        if (key.length !== 26 || new Set(key).size !== 26 || /[^A-Z]/.test(key)) {
            alert("❌ Error: Substitution Cipher requires a 26-letter key with unique A-Z characters only.");
            return;
        }
        requestData.key = key;
    }

    if (type === "affine") {
        let a = parseInt(document.getElementById("affineA").value);
        let b = parseInt(document.getElementById("affineB").value);
        if (isNaN(a) || isNaN(b)) {
            alert("❌ Error: Affine Cipher requires numeric 'a' and 'b' values.");
            return;
        }
        requestData.a = a;
        requestData.b = b;
    }

    fetch("https://your-backend.onrender.com/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`❌ Error: ${data.error}`);
        } else {
            document.getElementById("output").value = data.encrypted;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("❌ Error: Failed to communicate with the server.");
    });
}
toggleInputs();
