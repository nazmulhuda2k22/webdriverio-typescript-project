const firstSuiteLocator = $("div[role='radiogroup'] label:nth-child(1)");
const popUpTitleLocator = $("//h6[normalize-space()='Place an order?']");
const suitesContinueButton = $('(//button[normalize-space()="Continue"])[2]');
const suitesSaveButton = $('//button[normalize-space()="Save"]');


/**
 * Retrieves the title of the page based on the provided page name.
 * 
 * @param {string} pageName - The name of the page to get the title for.
 * @returns {Promise<string>} - A promise that resolves to the text of the page title.
 */
export async function getPageTitle(pageName:string): Promise<string> {
    let pageTitle = $("#__next h4");
    if(pageName != "My Events" && pageName!= "My Suites") {
        pageTitle = $("#__next h1");
    }
    await pageTitle.waitForExist();
    const pageTitleText = await pageTitle.getText();
    return pageTitleText;
}

/**
 * Opens the Suites Partner from the Suites page.
 * @function openSuitesPartnerFromSuites
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export async function openSuitesPartnerFromSuites() {
    if(await popUpTitleLocator.isExisting()) {
        await suitesContinueButton.waitForEnabled();
        await suitesContinueButton.click();
        await suitesSaveButton.waitForExist();
        await suitesSaveButton.click();
    } else {
        const createNewOrderRadioButton = $("//span[normalize-space()='Create new order']");
        await createNewOrderRadioButton.waitForExist();
        await createNewOrderRadioButton.click();
        await suitesContinueButton.waitForExist();
        await suitesContinueButton.waitForClickable();
        await suitesContinueButton.click();
        await suitesContinueButton.waitForExist({ reverse: true });
    }
}

/**
 * Selects the first suite
 * 
 * @async
 * @function selectFirstSuite
 * @returns {Promise<void>} A promise that resolves when the first suite has been selected.
 */
export async function selectFirstSuite() {
    await firstSuiteLocator.waitForExist();
    await firstSuiteLocator.click();
}