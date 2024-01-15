import * as userInfo from '../data/user-info.json';
import CryptoJS from "crypto-js";

const inputEmail = $('[name="email"]');
const inputPassword = $('[name="password"]');
const btnSubmit = $('button[type="submit"]');

/**
 * Logs in a user by setting the email and password values and clicking the submit button.
 * This function retrieves the decrypted email and password from the `userInfo` object,
 * sets these values in the respective input fields, and then clicks the submit button.
 *
 * @function login
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
export async function login() {
    await inputEmail.setValue(getDecryptedValue(userInfo.email));
    await inputPassword.setValue(getDecryptedValue(userInfo.password));
    await btnSubmit.click();
}

/**
 * Decrypts the given data using the secret key from environment variables.
 *
 * @param data - The encrypted string to be decrypted.
 * @returns The decrypted string.
 * @throws Will throw an error if the SECRET_KEY environment variable is not defined.
 */
export function getDecryptedValue(data: string) {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error('SECRET_KEY is not defined');
    }
    return CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
}

export async function openUrl(path: string) {
    return browser.url(process.env.URL + path);
}
