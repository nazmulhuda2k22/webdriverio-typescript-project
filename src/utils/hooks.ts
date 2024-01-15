import { After, AfterAll, AfterStep, ITestCaseHookParameter, Status } from '@cucumber/cucumber';
import { browser } from '@wdio/globals';
import cucumberJson from 'wdio-cucumberjs-json-reporter';
const browsers = [
    {
        browser,
        alias: 'default',
    },
];

AfterStep(async function (scenario: ITestCaseHookParameter) {
    const currentBrowser = browsers[0].browser as WebdriverIO.Browser;
    if (scenario.result?.status !== Status.PASSED) {
        await cucumberJson.attach(`Specs: ${scenario.pickle.uri}\n`);
    }

    if (scenario.result?.status === Status.FAILED) {
        const rawLogs = (await currentBrowser.getLogs('browser') as { level: string; message: string }[]).map(
            (log) => `${log.level}: ${log.message}`
        );
        if (rawLogs && rawLogs.length) {
            cucumberJson.attach('Logs: \n' + rawLogs.join('\n'));
        }

        cucumberJson.attach(await currentBrowser.takeScreenshot(), 'image/png');

    }
});

// Runs after each scenario
After(async function () {
    console.log('Tearing down after scenario...');
    await browser.deleteCookies(); // Clear cookies to reset session
    await browser.execute('window.localStorage.clear();'); // Clear local storage
    await browser.execute('window.sessionStorage.clear();'); // Clear session storage
});

// Runs after all scenarios
AfterAll(async function () {
    console.log('Closing browser after all tests...');
    await browser.closeWindow(); // Close the browser
});
