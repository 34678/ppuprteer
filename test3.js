// 打开浏览器的时间到vedio标签出现的时间
const puppeteer = require('puppeteer');
var colors = require( "colors");
var urls = require('./config.js')
(async () => {
        const browser = await puppeteer.launch({
           headless: false,
           executablePath:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
           slowMo:0
        });

        const page = await browser.newPage();
        var res = [];
        await urls.forEach((ele)=>{
            var date  = new Date();
            page.goto(ele);
            await page.waitForSelector('video').then(()=>{
                var date2  = new Date();
                var interval = date2-date;
                res.push(interval);
                console.log(colors.red(interval))
            })  
        })   
        //等待vedio标签出现 出现了以后打印出时间然后关闭浏览器
        console.log(res);
        browser.close();
    }
)();