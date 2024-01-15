import { When } from "@wdio/cucumber-framework";
import { addOneItemFromEachCategory, openCart } from "../pageobjects/suite-partner.page";

When("the user adds one item from each category", async() => {
    await addOneItemFromEachCategory();
});

When("the user opens the cart", async () => {
    await openCart();
});