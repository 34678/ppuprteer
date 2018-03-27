(async () => {
         

         
        
        function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
    	console.log(x)
      resolve(x);
    }, Math.random()*1000);
  });
}
await resolveAfter2Seconds(2)
         resolveAfter2Seconds(3 )
        //等待vedio标签出现 出现了以后打印出时间然后关闭浏览器
       
        
    }
)();