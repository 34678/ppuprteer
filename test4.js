// 计算白屏到资源文件下载好的时间
const puppeteer = require('puppeteer');

(async () => {
        const browser = await puppeteer.launch({
           headless: false,
           executablePath:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"          
        });
        function interval(request){
        	if((request._url.indexOf("c_time") !== -1)&&(request._url.indexOf("s_time") !== -1)){
                var date2  = new Date();
                console.log(date2-date) ;
                browser.close(); 
        	}
        }
        const page = await browser.newPage();
        date  = new Date();
        page.goto('http://www.yy.com/50859655/50859655?tempId=33554521').catch(e=>{});
        // n次监听拿到退出的在关闭 所以不能把 browser.close();  放在最后面 应该放在成功的判断语句里面
		await page.on('request',interval);        
    }
)();