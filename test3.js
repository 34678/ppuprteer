// 打开浏览器的时间到vedio标签出现的时间
const puppeteer = require('puppeteer');
const colors = require( "colors");
const config = require('./config.js');
(async () => {
        var res = [];
        // 这里不要用foreach  因为会改变async/await 的结构
        for(var ele in config.urls) {
           var browser = await puppeteer.launch({
                headless: false,
                executablePath:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
                slowMo:0
            }).catch(error => console.log(error.message));
            var page = await browser.newPage().catch(error => console.log(error.message));
            var date  = new Date();
            page.goto(config.urls[ele]);
            await page.waitForSelector('video').then(() => {
                var date2 = new Date();
                var interval = date2 - date;
                res.push(interval);
                console.log(colors.red(interval))
            }).catch(error => console.log(error.message));
            browser.close();
        }
        //等待vedio标签出现 出现了以后打印出时间然后关闭浏览器
        console.log(res);

    }
)();