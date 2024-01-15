import { Then, When } from "@wdio/cucumber-framework";
import { sumOfAllItem, subTotalAmount,
     enterCardDetails,
     sumOfAllTaxAndFee,
     orderTotalAmount, clickVerifySubtotalButton,
     getErrorTextInCardField,
     selectPaymentByCreditCard,
     loadPaymentSuccessPage} from "../pageobjects/cart.page";

Then("the subtotal amount should be equal to the sum of the items in the cart", async () => {
    expect(await sumOfAllItem()).toEqual(await subTotalAmount());
});

Then("the order total amount should be equal to the sum of all the taxes and fees", async () => {
    expect(await sumOfAllTaxAndFee()).toEqual(await orderTotalAmount());
})

When("the user selects payment by Credit Card", async () => {
    await selectPaymentByCreditCard();
});

When("the user pays with valid card details", async () => {
    await enterCardDetails();
    await clickVerifySubtotalButton();
    await loadPaymentSuccessPage();
});

When("the user clicks Verify subtotal button", async() => {
    await clickVerifySubtotalButton();
});

Then("there should be error text {string} under {string} field", async(errorText: string, fieldName:string) => {
    expect(await getErrorTextInCardField(fieldName)).toEqual(errorText);
});