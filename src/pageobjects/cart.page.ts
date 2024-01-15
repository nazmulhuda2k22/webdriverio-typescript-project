const creditCartLocator = $("(//div[contains(@class,'adyen-checkout__payment-method__header')])[2]");
const iFrameCardNumberLocator = $('[class="js-iframe"][title="Iframe for secured card number"]');
const iFrameExpiryDateLocator = $('[class="js-iframe"][title="Iframe for secured card expiry date"]');
const iFrameCvcLocator = $('[class="js-iframe"][title="Iframe for secured card security code"]');
const cardNumberLocator = $("//input[contains(@id, 'adyen-checkout-encryptedCardNumber')]");
const expiryDateLocator = $("//input[contains(@id, 'adyen-checkout-encryptedExpiryDate')]");
const cvcLocator = $("//input[contains(@id, 'adyen-checkout-encryptedSecurityCode')]");
const cardHolderLocator = $("//input[contains(@id, 'adyen-checkout-holderName')]");
const paymentCheckbox = $('[class="adyen-checkout__checkbox__label"]');
const startOrderLocator = $("//button[normalize-space()='Start Order']");
const checkOutButtonLocator = $('[class="adyen-checkout__button__content"]');
import * as cardInfo from "../data/card-info.json";
import { getDecryptedValue } from "./login.page";

/**
 * Calculates the sum of all item prices in the cart.
 * @returns {Promise<number>} The total sum of all item prices.
 */
export async function sumOfAllItem(): Promise<number> {
    const itemPriceLocatorArray = browser.$$('[data-testid="item-subtotal"]');
    let sumOfItem = 0;
    for (let i = 0; i < await itemPriceLocatorArray.length; i++) {
        const itemPrice = await itemPriceLocatorArray[i].getText();
        sumOfItem += parseFloat(itemPrice.replace("$", ""));
    }
    return sumOfItem;
}

/**
 * Retrieves the subtotal amount from the cart page.
 * @returns {Promise<number>} A promise that resolves to the subtotal amount as a number.
 */
export async function subTotalAmount(): Promise<number> {
    const subTotalLocator = browser.$$("ul li div:nth-child(2)");
    const subTotal = await subTotalLocator[0].getText();
    return parseFloat(subTotal.replace("$", ""));
}

/**
 * Retrieves the total order amount from the cart page.
 * @returns {Promise<number>} The total order amount as a number.
 */
export async function orderTotalAmount(): Promise<number> {
    const orderTotalLocator = browser.$$("ul li div:nth-child(2)");
    const orderTotal = await orderTotalLocator[await orderTotalLocator.length - 1].getText();
    return parseFloat(parseFloat(orderTotal.replace("$", "")).toFixed(2));
}

/**
 * Enters the card details into the respective fields within iframes.
 * @returns {Promise<void>} A promise that resolves when all card details have been entered.
 */
export async function enterCardDetails(): Promise<void> {
    await iFrameCardNumberLocator.waitForExist();
    await browser.switchFrame(iFrameCardNumberLocator);
    await cardNumberLocator.setValue(getDecryptedValue(cardInfo.card_number));
    await browser.switchToParentFrame();
    await iFrameExpiryDateLocator.waitForExist();
    await browser.switchFrame(iFrameExpiryDateLocator);
    await expiryDateLocator.setValue(getDecryptedValue(cardInfo.expiry_date));
    await browser.switchToParentFrame();
    await iFrameCvcLocator.waitForExist();
    await browser.switchFrame(iFrameCvcLocator);
    await cvcLocator.setValue(getDecryptedValue(cardInfo.cvc));
    await browser.switchToParentFrame();
    await cardHolderLocator.setValue(getDecryptedValue(cardInfo.name_on_card));
}

/**
 * Calculates the sum of all taxes and fees listed on the page.
 * @returns {Promise<number>} The sum of all taxes and fees as a floating-point number.
 */
export async function sumOfAllTaxAndFee(): Promise<number> {
    const taxLocatorArray = browser.$$('ul li div:nth-child(2)');
    let sumOfTaxAndFee = 0;
    for (let i = 0; i < await taxLocatorArray.length - 1; i++) {
        const tax = await taxLocatorArray[i].getText();
        sumOfTaxAndFee += parseFloat(tax.replace("$", ""));
    }
    return parseFloat(sumOfTaxAndFee.toFixed(2));
}

/**
 * Clicks the verify subtotal button
 * @returns {Promise<void>}
 */
export async function clickVerifySubtotalButton(): Promise<void> {
    await paymentCheckbox.waitForDisplayed();
    await checkOutButtonLocator.waitForEnabled();
    await checkOutButtonLocator.click();
}

/**
 * Retrieves the error text from a specified card field.
 * @param {string} fieldName - The name of the card field to get the error text from.
 * @returns {Promise<string>} - A promise that resolves to the error text of the specified card field.
 */
export async function getErrorTextInCardField(fieldName: string): Promise<string> {
    const cardErrorTextFieldsArray = browser.$$('[class="adyen-checkout__error-text"]');
    if (fieldName === "CARD NUMBER")
        return await cardErrorTextFieldsArray[0].getText();
    else if (fieldName === "EXPIRY DATE")
        return await cardErrorTextFieldsArray[1].getText();
    else if (fieldName === "CVC/CVV")
        return await cardErrorTextFieldsArray[2].getText();
    else
        return await cardErrorTextFieldsArray[3].getText();
}

/**
 * Selects the payment method by credit card.
 * @returns {Promise<void>} A promise that resolves when the payment method has been selected.
 */
export async function selectPaymentByCreditCard(): Promise<void> {
    await creditCartLocator.waitForExist();
    await creditCartLocator.click();
}

/**
 * Loads the payment success page by waiting for the start order locator to exist.
 * @returns {Promise<void>} A promise that resolves when the start order locator exists.
 */
export async function loadPaymentSuccessPage(): Promise<void> {
    await startOrderLocator.waitForExist();
}