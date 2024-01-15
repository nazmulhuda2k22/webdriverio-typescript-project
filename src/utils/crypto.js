import CryptoJS from "crypto-js";
// Encrypt
var encrypted = CryptoJS.AES.encrypt('CHEQ by Cantaloupe', process.env.SECRET_KEY).toString();
console.log("pass"+encrypted);
// Decrypt
var bytes  = CryptoJS.AES.decrypt(encrypted, process.env.SECRET_KEY);
var originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log(originalText); // 'my message'
