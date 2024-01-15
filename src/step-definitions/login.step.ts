import { Given } from '@wdio/cucumber-framework';
import { openUrl, login } from '../pageobjects/login.page.ts';

Given("the user logs in from the {string} page", async (path:string) => {
    await openUrl(path);
    await login();
});

