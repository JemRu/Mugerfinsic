var roomid = "";
var username = getName();
var info = "";
var inroom = "";
var Ins = getIns();
function fetchData(data_info){  //交换roomID 发送tempid 交换的 roomid
    $.ajax({  
        url:"interface/QuickAdd.php",
        type: "POST",
        data: data_info,
        success: function(data){
            handleFetch(data);
        }  
    });
}
function  handleFetch(data) {
    data = JSON.parse(data);
    var ticket = data.roomid;
    switch (ticket)
    {
        case -1:
        alert("恶意访问是不对的");
        break;
        case -2:
        alert("等一等好嘛，没有房间了");
        break;
        case -3:
        alert("我们找啊找还是没找到这个房间");
        break;
        case -4:
        alert("来晚了一步，该房间满了啦");
        break;
        case -5:
        alert("没有人创建房间啦，要不你创建一个嘛");
        break;
        case 0:
        var dataInfo = {name:username,roomid:roomid,ins:Ins};
        alert("大人你的包间"+roomid+"已经为您开好");
        fetchGame(dataInfo);
        break;
        default :
        roomid = ticket;
        var dataInfo = {name:username,roomid:roomid,ins:Ins};
        /*alert(dataInfo);*/
        fetchGame(dataInfo);
    }
    return true;
}
function getData(){ //创建房间 后台分配房间号码
	$.ajax({
		url: "interface/CreateRoom.php",
        type: "POST",
        datatype: "json",
		success: function(data){
            handledData(data);
		}
	});
}
function handledData(data) {
    //alert(data);
    data = JSON.parse(data);
    roomid = data.roomid;
    if (!roomid) {
        alert("房间duang的一下就满了，等一好不啦~");
    } else {
        var dataInfo = {name:username,roomid:roomid,ins:Ins};
        fetchGame(dataInfo);
    }
    return true;
}
function fetchGame(data_info){
	//发送 name roomID -1 失败 恶意访问 -2 房间突然满了 -3 服务器君去厕所了0 成功
	$.ajax({
        url:"interface/AddToRoom.php",
        type: "POST",
        data: data_info,
        success: function(data){
            handleGame(data);
        }
    });
}
function handleGame(data) {
    data = JSON.parse(data);
    info = data.statue ;
    /*alert(info);*/
    switch (info)
    {
        case -1:
            alert("恶意访问必然会登陆失败");
            break;
        case -2:
            alert("房间duang的一下就满了");
            break;
        case -3:
            alert("服务器君去厕所了");
            break;
        case 0:
            alert("6666游戏走起");
            setRoomid(roomid);
            checkIns();
            break;
        default:
            alert("谜一般的失败了,都是臣妾的错");
    }
    return true;
}
function enterNow(){
    setPosition(1);
	//立即进入 clickf  交换roomID 发送 name roomID
	roomid = document.getElementById("roomid").value;
    if (roomid == "") {
        roomid = -1;
    }
	var tempid = {roomid:roomid}
	fetchData(tempid); //-1 失败 恶意访问 -2  房间都满了 -3  没有这个房间号 -4  这个房间满了  -5   这个房间没有人创建   0  成功
}	
function createRoom(){
    setPosition(0);
	//创建房间 clickf  得到roomID 发送 name roomID
    getData();
    // var dataInfo = {name:username,roomid:roomid};
    // var inFo = fetchGame(dataInfo);
    //-1 失败 恶意访问 -2 房间突然满了 -3 服务器君去厕所了0 成功
}
function checkIns(){ //处理cookie 跳转至play页面
    var ins = getIns();
    console.log(this);
    if (ins == "drum") {
        window.location.href = "play_"+ins+".php";
    } else if(ins == "box") {
        window.location.href = "play_"+ins+".php";
    } else if(ins == "piano") {
        window.location.href = "play_"+ins+".php";
    } else if(ins == "my") {
        window.location.href = "play_"+ins+".php";
        return true;
    }
    return true;
}
window.onload = function() {
    var goin = document.getElementById("goin");
    var room = document.getElementById("room");
    if(goin.addEventListener){  
        goin.addEventListener("click",enterNow,false);  
    } else if(goin.attachEvent){  
        goin.attachEvent("onclick",enterNow);  
    }
    if(room.addEventListener){  
        room.addEventListener("click",createRoom,false);  
    } else if(room.attachEvent){  
        room.attachEvent("onclick",createRoom);  
    }
}
function getName() { //得到ins cookie
    var name = document.cookie.indexOf("name");
    if (name == -1){
        return "";
    } else {
        start = name+5;
        end = document.cookie.indexOf(";",start);
        if (end == -1) {
            end = document.cookie.length;
        }
        return document.cookie.substring(start,end);
    }
}
function getIns() { //得到ins cookie
    var ins = document.cookie.indexOf("ins");
    if (ins == -1){
        return "";
    } else {
        start = ins+4;
        end = document.cookie.indexOf(";",start);
        if (end == -1) {
            end = document.cookie.length;
        }
        return document.cookie.substring(start,end);
    }
}