// 计算白屏到资源文件下载好的时间
const puppeteer = require('puppeteer');
const colors = require( "colors");
const config = require('./config.js');
const cTable = require('console.table');
(async (stacktrace) => {
        var res = [];
        for(var ele in config.urls) {
            var browser = await puppeteer.launch({
                headless: false,
                executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
            }).catch(error => console.log(error.message));
            function interval(request) {
                if ((request._url.indexOf("c_time") !== -1) && (request._url.indexOf("s_time") !== -1)) {
                    var date2 = new Date();
                    res.push((date2 - date)/1000);
                    page.flag = true;
                    browser.close();
                }
            };

            var page = await browser.newPage().catch(error => console.log(error.message));
            //放一个标志位作为page的属性用于判断是否找到我们需要的request  page waitfor找到以后才能继续执行后面的语句
            page.flag = false;
            var date = new Date();
            page.goto(config.urls[ele]).catch(e => {
            });
            // n次监听拿到退出的在关闭 所以不能把 browser.close();  放在最后面 应该放在成功的判断语句里面
            await page.on('request', interval);
            await page.waitForFunction(function(){
                return this.flag;
            }).catch(error => console.log(error.message));
        }
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
        console.log('计算白屏到资源文件下载好的时间');
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