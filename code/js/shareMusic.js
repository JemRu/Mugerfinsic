var statueInfo = "";
var typeInfo = "";
function ifsaveMusic(data_info) {
    $.ajax({  
	    url:"interface/shareMusic1.php",
	    data: data_info,
        type: 'POST',
	    success: function(data){
            handleSave(data);
	    }  
	});
}
function handleSave(data) {
    data = JSON.parse(data);
    statueInfo = data.savestatue;
        //0 存储成功，-1 存储失败
    if (typeInfo == 1) {
        if (statueInfo == 0) {
            alert('分享成功');
            loseShare();
        } else {
            alert("网络有点卡，或者服务器又去上厕所了，分享失败了嘤嘤");
        }
    } else if (typeInfo == 2) {
        if (statueInfo == 0) {
            setName("");
            setModel("");
            setIns("");
            setRoomid("");
            setPosition("");
            setBgm("");
            alert("开启时空大门");
            window.location.href = "index.php";
        } else {
            window.location.href = "index.php";
        }
    }

}
function getMusicList() {
    $.ajax({  
	    url:"interface/getMusicData.php",
        type: 'POST',
	    success: function(data){
	    	var data = eval("("+data+")");
	       handleMusicList(data);
	    }  
	});            
}
function handleMusicList(data) {
    if (data == -1) {

    } else {
        //var data = JSON.parse(data);
        var para = document.getElementById('music2');
        var str ="";
        for(var i=0; i<data.length; i++){
        	var musicList = data[i];
        	for (var key in musicList) {
        		str += "<div class='mymusic'><div class='name'>最新音乐"+(i+1)+"</div><div class='music'>"+
            "<a class='playSMusic' id='"+musicList[key]+"'' href='#''>"+musicList[key]+"</a></div></div>";
            para.innerHTML = str;
        }
        }
        
        var playLink = document.getElementsByClassName("playSMusic");
    	for (var i = 0;i < playLink.length;i++) {
        	if(playLink[i].addEventListener){  
            	playLink[i].addEventListener("click",playSavedMusic,false);  
        	} else if(playLink[i].attachEvent){  
            	playLink[i].attachEvent("onclick",playSavedMusic);  
        	}
    	}
        
    }
}
function getSavedMusic(musicNameInfo) {
    data_info = {musicname:musicNameInfo}
    $.ajax({  
        url:"interface/playMine1.php",
        data: data_info,
        type: 'POST',
        success: function(data){
        	var data1 = eval("("+data+")");
        	var datainfo = eval(data1);
            handlePlaySMusic(datainfo);
        }  
    });
}

function shareBgm(data){
	var bgmaudio = document.getElementById("bgm_audioShare");
	bgmaudio.src = "audio/bgm/"+data[0].bgmname+".mp3";
	bgmaudio.play();
}

function handlePlaySMusic(data) {
    //data = JSON.parse(data);
    var palyStatue = data.statue;
//  if (palyStatue = -1) {
//      alert("噫，恶意访问是不对的哟");
//  } else if (palyStatue = -2) {
//      alert("噫，没有找到这首歌");
//  } else {
		console.log(data);
		shareBgm(data);
        Play(data);
 //   }
}


function getMusicStatue(data_info) {
        setInterval(function(){
            $.ajax({
                url: 'interface/getMusicStatue1.php',
                type: 'POST',
                success:function(data){
                	data = JSON.parse(data);
            		var liststatue = data.liststatue;
                    if (liststatue == '' || liststatue == undefined || liststatue == '1'){

                    } else if (liststatue=='2') {
                    	refreshMusic();
                    }
                }
            });
        },7000);
}
function refreshMusic() {
	getMusicList();
}
function saveMusic() {
	var haorooms2= new Date().Format("yyyy-MM-dd");
	var Name = getName();
	var musicName = "" + Name + haorooms2;
	var bgmName = getBgm();
    var id = "";
	var model = getModel();
    if (model== "0") {
        id = "-1";
    } else if (model == "1") {
        id = getRoomid();
    }
    typeInfo = 1;
    var musicData = {roomid:id,name:Name,type:1,musicname:musicName,bgmname:bgmName};
    ifsaveMusic(musicData);
}
function loseShare() {
	var shareButton = document.getElementById('share');
	shareButton.disabled = true;
}
function backIndex() {
    var haorooms2= new Date().Format("yyyy-MM-dd");
    var Name = getName();
    var musicName = "" + Name + haorooms2;
    var bgmName = getBgm();
    var id = "";
    var model = getModel();
    if (model== "0") {
        id = "-1";
    } else if (model == "1") {
        id = getRoomid();
    }
    typeInfo = 2;
    var musicData = {roomid:id,name:Name,type:2,musicname:musicName,bgmname:bgmName};
    ifsaveMusic(musicData);
}
function playSavedMusic() {
    var playLink = document.getElementsByClassName("playSMusic");
    var smusicName = this.attributes["id"].value;
    getSavedMusic(smusicName);
}
function getBgm() { //得到ins cookie
    var bgm = document.cookie.indexOf("bgm");
    if (bgm == -1){
        return "";
    } else {
        start = bgm+4;
        end = document.cookie.indexOf(";",start);
        if (end == -1) {
            end = document.cookie.length;
        }
        return document.cookie.substring(start,end);
    }
}
window.onload = function() {
	LOAD1();
    refreshMusic();
    getMusicStatue();
    var share = document.getElementById("share");
    var again = document.getElementById("playagain");
    if(share.addEventListener){  
        share.addEventListener("click",saveMusic,false);  
    } else if(share.attachEvent){  
        share.attachEvent("onclick",saveMusic);  
    }
    if(again.addEventListener){  
        again.addEventListener("click",backIndex,false);  
    } else if(again.attachEvent){  
        again.attachEvent("onclick",backIndex);  
    }
}
Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}