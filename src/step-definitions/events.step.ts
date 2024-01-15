import { When } from '@wdio/cucumber-framework';
import {clickEventDate, clickOnButton, clickOnEvent} from '../pageobjects/events.page.ts';

When("the user selects the event {string} from date {string}", async (eventName:string, eventDate:string) => {
    await clickEventDate(eventDate);
    await clickOnEvent(eventName);
});

When("the user clicks on the {string} button", async (buttonName: string) => {
    await clickOnButton(buttonName);
});
