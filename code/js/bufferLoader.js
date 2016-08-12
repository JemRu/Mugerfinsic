function bufferLoader(context, urlList, callback){
	//AudioContext对象
	this.context = context;
	//设置多个需要被播放的音频的url数组
	this.urlList = urlList;
	//设置解码成功时执行的回调函数
	this.onload = callback;
	//初始化AudioBuffer对象数组
	this.bufferList = new Array();
	//初始化已经创建的AudioBuffer对象的计数器（计算对象个数）
	this.loadCount = 0;
}
//加载服务器端音频数据
bufferLoader.prototype.loadBuffer = function(url, index){
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	
	var loader = this;
	request.onload = function(){
		loader.context.decodeAudioData(
			request.response,
			function(buffer){
				if(!buffer){
					alert("不能解码"+ url +"中的数据");
					return;
				}
				loader.bufferList[index] = buffer;
				console.log("succeed");
				//如果urlList中的音频全部加载完毕，直接播放所有加载的音频
				if(++loader.loadCount == loader.bufferList.length){
					console.log("get it");
					loader.onload(loader.bufferList);
				}
			}
		);
	}
	request.onerror = function(){
		alert("有来自bufferLoader类的错误");
	}
	request.send();
}
//最后直接调用的函数
bufferLoader.prototype.load = function(){
	for(var i=0; i<this.urlList.length; ++i){
		this.loadBuffer(this.urlList[i], i);
	}
}
