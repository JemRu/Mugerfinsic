function AddPlayer(userid,username,yueqi){
	var userbox=$('<div></div>');  
	userbox.addClass("userbox");
	userbox.attr("id",userid);
	
	var userpic=$('<div></div>');
	userpic.addClass("userpic");
	userpic.attr("id","pic"+userid);
	
	var Joinimg=new Image();
	Joinimg.src="img/play/joinpic.png";
	var Createimg=new Image();
	Createimg.src="img/play/createpic.png";
	
	var userdescribe=$('<div></div>');
	userdescribe.addClass("userdescribe");
	userdescribe.attr("id","describe"+userid);
	
	var userfont=$('<div></div>');
	userfont.addClass("userfont");
	userfont.attr("id","userfont"+userid);
	
	$(".middle").append(userbox);
	$("#"+userid).append(userpic);
	$("#"+"pic"+userid).append(Createimg);
	$("#"+userid).append(userdescribe);
	$("#"+"describe"+userid).append(userfont);
	$("#"+"userfont"+userid).append(username);
	$("#"+"userfont"+userid).append("<br />");
	$("#"+"userfont"+userid).append(yueqi);
}

function RemovePlayer(userid){
	$("#"+userid).remove();
}

//ajax上传数据
function update_Ajax(Audio_info){
    var roomId=getRoomid();
    $.ajax({
        url: 'interface/putData.php',
        type: 'POST',
        data: {data1:Audio_info, roomid:roomId},
        success:function(data){
                    console.log(data);
                }
    });
//  update = debounce(300,function(){ 
//      console.log("233333");  
//  });
}

//处理gamestatues,房主点击START、END按钮改变状态
function DealGameStatue(data1){
    for(var i=0; i<data1.length; i++){
        if(data1[i].gamestatue == 0){//房主点击END
            //正常结束，转到分享界面
            window.location = "share_music.php";
        }else if(data1[i].gamestatue == -1){//玩家关闭页面
            //异常结束
            if(getPosition() == 1){
                //房主，解散房间
                alert("房主解散了该房间");
                window.location = "index.php";
            }//else{
                //非房主，处理页面去掉玩家的信息
            //}
        }else if(data1[i].gamestatue == 1){//房主点击START之后，唤醒其他玩家
            //游戏开始
            $("Start").click();
        }else if(data1[i].gamestatue == 2){
            //游戏未开始
        }
    }
}

//处理bgmstatues,房主点击音频的开始按钮时改变，1播放 2不播放
var bgmStamp;
function DealBgmStatue(data1){
        if(data1.bgmstatue == 1 && bgmStamp !=1 && data1.bgmname!=undefined && data1.bgmname!=""){
        	var bgmname1 = decodeURI(data1.bgmname);
            var audio1 = document.getElementById("bgm_audio");
            audio1.src = "audio/bgm/"+bgmname1+".mp3";
            audio1.play();
            setBgm(bgmname1);
            bgmStamp = 1;
        }
}
function DealBgmName(data1){
	if(data1[0].bmgname != undefined){
		$("#selectMusic").html(data1[0].bmgname);
	}
}

//处理statues01~04
//1：在房间里，2：不在房间
//gamestatues发往后台时，statues会有相应的变化
function DealStatue(data1){
  //玩家1
  if(data1.statue01==1 && data1.play01!=-1 && $("#play01").length<=0){
        //添加玩家进来
        AddPlayer("play01",data1.play01,data1.ins01);
    }
    if(data1.statue01==2 && $("#play01").length>0){
        //删除该玩家
        RemovePlayer("play01");
    }
    //玩家2
    if(data1.statue02==1 && data1.play02!=-1&& $("#play02").length<=0){
        //添加玩家进来
        AddPlayer("play02",data1.play02,data1.ins02);
    }
    if(data1.statue02==2 && $("#play02").length>0){
        //删除该玩家
        RemovePlayer("play02");
    }

    //玩家3
    if(data1.statue03==1 && data1.play03!=-1&& $("#play03").length<=0){
        //添加玩家进来
        AddPlayer("play03",data1.play03,data1.ins03);
    }
    if(data1.statue03==2 && $("#play03").length>0){
        //删除该玩家
        RemovePlayer("play03");
    }

    //玩家4
    if(data1.statue04==1 && data1.play04!=-1&& $("#play04").length<=0){
        //添加玩家进来
        AddPlayer("play04",data1.play04,data1.ins04);
    }
    if(data1.statue04==2 && $("#play04").length>0){
        //删除该玩家
        RemovePlayer("play04");
    }
}
function setBgm(info){
    document.cookie = "bgm="+info;
}