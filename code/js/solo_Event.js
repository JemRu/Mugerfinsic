var bgmNum2 = "";
var bgmList = new Array("BLISS","ClannadRemix","NEXTTOYOU","天空之城","天之痕","小苹果","小星星","雪之梦","与你同在");
var bgmselect = 1;
//////
//单人游戏部分代码
//////

//点击end按钮|| 直接关闭页面的时候调用 endgame.php
function endGame(statue){
	var Name = getName();
	//statue 1：正常结束，2：异常结束
	var Gamestatue = statue;
	$.post("interface/endgame.php",{
		name:Name,
		gamestatue:Gamestatue
	});
}

//关闭页面监听事件
//window.onbeforeunload = function(){

//}

function update_Ajax(Audio_info){
	var Name = getName();
	$.ajax({
	    url: 'interface/soloput.php',
	    type: 'POST',
	    data: {
	    	data1:Audio_info,
	    	name:Name
	    },
	    success:function(data){
	                console.log(data);
	            }
	});

}
function playBgm(){
    var playbgm = document.getElementById("control");
    playbgm.onclick=(function(){ 
  	return function(){
            if (bgmselect == 1) {
                alert("房主大人先选个背景音乐呗");
            } else if (bgmselect == 0) {
                alert("大人确定背景音乐吗，选好就不能换咯");
                var audio1 = document.getElementById("bgm_audio");
                var bgmname = decodeURI(getBgmName());
                audio1.src = bgmname;
                audio1.play();
                var playbutton = document.getElementById("control");
                playbutton.parentNode.removeChild(playbutton);
            }
        };
    }())
}
function getBgmName() {
	var bgm = "audio/bgm/"+bgmList[bgmNum2]+".mp3";
	return bgm;
}
function onClickList() {
    var oUl = document.getElementById("allMusic");
    console.log(oUl);
    var oLis = oUl.getElementsByTagName("li");
    for (var i=0;i<oLis.length;i++) {
        oLis[i].onclick=(function(i){   
	        　　return function(){
	        	bgmNum2 = i;
	        	bgmselect =0;
	        	console.log(bgmList[bgmNum2]);
            	setBgm(bgmList[bgmNum2]);
	        　　}
        }(i))
    }
}