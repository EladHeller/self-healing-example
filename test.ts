
import {BatchInfo, Configuration, EyesRunner, VisualGridRunner, BrowserType, Eyes, Target} from '@applitools/eyes-selenium'
import { Builder, Browser, By, Key, until } from 'selenium-webdriver'

async function test() {
    // Configure Applitools SDK to run on the Ultrafast Grid
    const Runner = new VisualGridRunner({ testConcurrency: 5 });
    const Batch = new BatchInfo({name: `Self healing`});

    const Config = new Configuration({
    });
    Config.setBatch(Batch);
    Config.addBrowsers(
        // { name: BrowserType.CHROME, width: 800, height: 600 },
        { name: BrowserType.FIREFOX, width: 1600, height: 1200 },
        // { name: BrowserType.SAFARI, width: 1024, height: 768 },
        // { chromeEmulationInfo: { deviceName: DeviceName.iPhone_11, screenOrientation: ScreenOrientation.PORTRAIT} },
        // { chromeEmulationInfo: { deviceName: DeviceName.Nexus_10, screenOrientation: ScreenOrientation.LANDSCAPE} }
    )
    const executionCloudUrl = await Eyes.getExecutionCloudUrl();
    const driver = await new Builder()
	.withCapabilities({
	  browserName: 'chrome',
	})
	.usingServer(executionCloudUrl)
	.build()


    const eyes = new Eyes(Runner, Config);

    // Start Applitools Visual AI Test
    // Args: Playwright Page, App Name, Test Name, Viewport Size for local driver
    await eyes.open(driver, 'Self healing', `Self heling`, { width: 1200, height: 600 })


    try {
        await driver.get('https://eladheller.github.io/self-healing-example/');
        await driver.findElement(By.css('.dark')).click();
        await eyes.check('dark', Target.window().fully());
        await driver.findElement(By.css('#changeButton')).click();
        await eyes.check('light', Target.window().fully());
        await driver.findElement(By.css('.dark')).click();
    } catch (e) {
        console.log(e);
    }
    await eyes.closeAsync();
    await driver.close();
}


test().catch((err) => {
    console.error(err)
    process.exit(1)
});