//////
//多人房间与后台交互事件
//////

//结束游戏exitGame.php
function exitGame(gamestatue, playerstatue){
	var Name = getName();
	var roomId = getRoomid();
	//gamestatue 3：正常结束，4：异常结束
	//playstatu 1：玩家在，-1：玩家离开
	//在getData.php轮询中可以更新玩家状态
	var Gamestatue = gamestatue;
	var Playstatue = playerstatue;
	$.post("interface/exitGame.php",{
		name:Name,
		roomid:roomId,
		gamestatue:Gamestatue,
		playstatue:Playstatue
	});
}

//背景音乐状态bgmStatus.php，点击音乐开始键调用
function bgmStatue(bgmName, bgmStatue){
	var Name = getName();
	var roomId = getRoomid();
	$.ajax({
		url:"interface/bgmStatue.php",
		type:"POST",
		data:{
			name:Name,
			roomid:roomId,
			bgmname:bgmName,
			bgmstatue:bgmStatue
		},
		success:function(data){
			var datainfo = eval("("+data+")");
			if (datainfo.statue==-1 || datainfo.statue==-2) {
				console.log("服务器崩了");
			}else if(datainfo.statue==0){
				console.log("背景音乐传送成功");
			}
		}
	});
}

//游戏状态，房主点击START调用
function gameStatue(gamestatue){
	var Name = getName();
	var roomId = getRoomid();
	$.post({
		url:"interface/gameStatue.php",
		type:"POST",
		data:{
			name:Name,
			roomid:roomId,
			gamestatue:gameStatue
		},
		success:function(data){
			var datainfo = eval("("+data+")");
			if (datadatainfo.statue==-1 || datadatainfo.statue==-2) {
				console.log("启动返回失败");
			}else if(datadatainfo.statue==-3){
				console.log("游戏已经开始了~");
			}else if(datadatainfo.statue==0){
				console.log("游戏状态更改成功");
			}
		}
	})
}