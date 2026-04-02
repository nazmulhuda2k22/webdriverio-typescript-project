import { After, AfterAll, AfterStep, ITestCaseHookParameter, Status } from '@wdio/cucumber-framework';
import cucumberJson from 'wdio-cucumberjs-json-reporter';

AfterStep(async function (scenario: ITestCaseHookParameter) {
    if (scenario.result?.status !== Status.PASSED) {
        await cucumberJson.attach(`Specs: ${scenario.pickle.uri}\n`);
    }

    if (scenario.result?.status === Status.FAILED) {
        const rawLogs = (await browser.getLogs('browser') as { level: string; message: string }[]).map(
            (log) => `${log.level}: ${log.message}`
        );
        if (rawLogs && rawLogs.length) {
            cucumberJson.attach('Logs: \n' + rawLogs.join('\n'));
        }

        cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
    }
});

// Runs after each scenario
After(async function () {
    console.log('Tearing down after scenario...');
    try {
        await browser.deleteCookies(); // Clear cookies to reset session
        
        // Try to clear storage, but don't fail if the page doesn't allow it
        await browser.execute(() => {
            try {
                window.localStorage.clear();
                window.sessionStorage.clear();
            } catch (e) {
                // Ignore errors when page doesn't allow storage access
            }
        });
        
        // Navigate to a blank page to reset state
        await browser.url('about:blank');
    } catch (error) {
        console.log('Error during teardown:', error);
    }
});

// Runs after all scenarios
AfterAll(async function () {
    console.log('Closing browser after all tests...');
    try {
        await browser.deleteSession(); // Properly close the WebDriver session
    } catch (error) {
        console.log('Error closing browser:', error);
    }
});
