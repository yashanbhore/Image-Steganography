var imgdatauri;

// Encryption function (Caesar cipher)
function encrypt(text, shift) {
    var result = '';
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode((charCode - 65 + shift) % 26 + 65);  // Uppercase letters
        } else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode((charCode - 97 + shift) % 26 + 97);  // Lowercase letters
        } else {
            result += text.charAt(i);  // Non-alphabetic characters
        }
    }
    // alert(result);
    return result;
}

// Decryption function (Caesar cipher)
function decrypt(text, shift) {
    return encrypt(text, 26 - shift);  // Decrypting is the same as encrypting with the opposite shift
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector("#image1").src = e.target.result;
            imgdatauri = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function decode(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var encryptedText = steg.decode(e.target.result);
            var decryptedText = decrypt(encryptedText, 3); // You can choose a different shift value

            console.log(decryptedText);
            document.querySelector('#decoded').innerText = decryptedText;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function hideText() {
    var plainText = document.querySelector('#text').value;
    var encryptedText = encrypt(plainText, 3); // You can choose a different shift value

    document.querySelector("#image2").src = steg.encode(encryptedText, imgdatauri);
}
