//(function(){
var BUFFERS = {};
var context2 = null;
var source;
var playing = false;
context2 = new (AudioContext ||webkitAudiocontext);
var BUFFERS_TO_LOAD;

function LOAD(){
	var ModelData = getModel();
	if(ModelData==0){
		var InsData = getIns();
		BUFFERS_TO_LOAD = select_instrument(InsData);
	}else if(ModelData==1){
		BUFFERS_TO_LOAD = select_all_instrument();
	}
	loadBuffers();
}
function LOAD1(){
	BUFFERS_TO_LOAD = select_all_instrument();
	loadBuffers();
}
console.log(BUFFERS_TO_LOAD);

function loadBuffers(){
	var names = [];
	var paths = [];
	for(var name in BUFFERS_TO_LOAD){
		var path = BUFFERS_TO_LOAD[name];
		names.push(name);
		paths.push(path);
	}
	console.log(paths);
	bufferloader = new bufferLoader(context2, paths, function(bufferList){
		for(var i=0; i<bufferList.length; i++){
			var buffer = bufferList[i];
			var name = names[i];
			BUFFERS[name] = buffer; 
			console.log(buffer);
		}
	});
	bufferloader.load();
	// document.getElementById("tips").innerHTML = "succeed loading!";
	console.log("succeed loading");
}

//play只需要一个参数buffersource就行，buffer_id直接传给数组
//多个音频传回后播放
//AudioInfolist是从服务器返回的数据
function Play(AudioInfolist){
	if(AudioInfolist == undefined || AudioInfolist==''){
		
	}else{
		for(var i=0; i<AudioInfolist.length; i++){
		source = context2.createBufferSource();

		var list = AudioInfolist[i].Buffer_id;
		var time = AudioInfolist[i].Buffer_time;
		
		console.log(BUFFERS);
		console.log(list);
		console.log('aa');
		source.buffer = BUFFERS[list];
		source.connect(context2.destination);
		source.start(time);
		console.log("success music");
		}
	}
}

//ajax传给后台,处理之后返回
function Audio_Play(buffer_id, buffer_time){
	var Audio_info = {
		Buffer_id: buffer_id,
		Buffer_time: buffer_time
	};
	console.log(Audio_info);
	//ajax上传并返回数据
	update_Ajax(Audio_info);
}

//})();
