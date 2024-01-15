import { Then, When } from "@wdio/cucumber-framework";
import { getPageTitle, openSuitesPartnerFromSuites, selectFirstSuite } from "../pageobjects/suites.page";

Then("the user should be in {string} page", async(pageName:string) => {
    expect(await getPageTitle(pageName)).toEqual(pageName);
});

When("the user selects a suite", async() => {
    await selectFirstSuite();
});

Then("the user clicks Continue button on the modal dialog", async () => {
    await openSuitesPartnerFromSuites();
});