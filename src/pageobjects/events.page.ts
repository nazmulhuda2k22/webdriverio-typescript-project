/**
 * Clicks on an event date button identified by its date.
 * @param {string} date - The date of the event to click on.
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
export async function clickEventDate(date: string): Promise<void> {
    const eventDate = $(`//button[normalize-space()="${date.split(" ")[0]}"]`);
    await eventDate.waitForExist();
    await eventDate.click();
}

/**
 * Clicks on an event element identified by its name.
 * @param {string} eventName - The name of the event to click on.
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
export async function clickOnEvent(eventName:string): Promise<void> {
    const eventLocator = $(`//span[normalize-space()="${eventName}"]`);
    await eventLocator.click();
}

/**
 * Clicks on a button identified by its name.
 * @param {string} buttonName - The name of the button to click on.
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
export async function clickOnButton(buttonName:string): Promise<void> {
    const buttonLocator = $(`//button[normalize-space()="${buttonName}"]`);
    await buttonLocator.waitForExist();
    await buttonLocator.waitForEnabled();
    console.log("button name " + await buttonLocator.getText());
    await buttonLocator.click();
    if(buttonName != "Continue" && buttonName != "Save Pre-Order" && buttonName != "Cancel Order") {
        await buttonLocator.waitForExist({ reverse: true });
    }
}


