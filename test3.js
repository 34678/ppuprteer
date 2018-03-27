// 打开浏览器的时间到vedio标签出现的时间
const puppeteer = require('puppeteer');
const colors = require("colors");
const config = require('./config.js');
const cTable = require('console.table');
(async () => {
        var res = [];
        // 这里不要用foreach  因为会改变async/await 的结构
        for (var ele in config.urls) {
            var browser = await puppeteer.launch({
                headless: false,
                executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
                slowMo: 0
            }).catch(error => console.log(error.message));
            var page = await browser.newPage().catch(error => console.log(error.message));
            var date = new Date();
            page.goto(config.urls[ele]);
            await page.waitForSelector('video').then(() => {
                var date2 = new Date();
                var interval = date2 - date;
                res.push(interval/1000);
            }).catch(error => console.log(error.message));
            browser.close();
        }
        //等待vedio标签出现 出现了以后打印出时间然后关闭浏览器
        //console.log(res);
        //对数据处理
        var num = config.urls.length;
        var avg = getavg(res).toFixed(2);
        var
            index1 = 0,
            index2 = 1,
            index3 = 2,
            index4 = 3,
            index5 = 6,
            res2 = [0,0,0,0];
         for(var x in res) {
             var e = res[x];
             if ((index1 <= e) && (index2 >= e)) {
                 res2[0]++;
             } else if ((index2 <= e) && (index3 >= e)) {
                 res2[1]++;
             } else if ((index3 <= e)) {
                 res2[2]++;
                 //6s以上
                 if(index4 <= e){
                     res2[3]++;
                 }
             }
         }
        var  res3 =[
            [`${index1}s-${index2}s`,res2[0]],
            [`${index2}s-${index3}s`,res2[1]],
            [`${index3}s以上`,res2[2]],
            [`${index4}s以上`,res2[3]]
        ];
        console.log('计算白屏到video出现的时间');
        console.log(colors.green('平均值:'+avg+'秒'));
        console.table(['区间','数量'],res3);
    }
)();

function getavg(array) {//求和函数
    var num = 0;
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if(array[i]<=6) {
            num = num + array[i];
            count++;
        }
    }
    return num/count;
}