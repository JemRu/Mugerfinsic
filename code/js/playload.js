var bgmNum = "";
var bgmList = new Array("BLISS","ClannadRemix","NEXTTOYOU","天空之城","天之痕","小苹果","小星星","雪之梦","与你同在");
var bgmselect = 1;
function playBgm()
{
    var playbgm = document.getElementById("control");
    playbgm.onclick=(function()
    {   

    　　return function()
    　　{
    　　　　//alert(bgmselect);
            if (bgmselect == 1) {
                alert("房主大人先选个背景音乐呗~");
            } else if (bgmselect == 0) {
                alert("大人确定背景音乐吗，选好就不能换咯");
                var playbutton = document.getElementById("control");
                playbutton.parentNode.removeChild(playbutton);
                bgmStatue(bgmList[bgmNum],1);
            }
    　　}
    }())
}
function onclickList()
{
var oUl=document.getElementById("allMusic");
var oLis=oUl.getElementsByTagName("li");
　　for(var i=0;i<oLis.length;i++)
　　{
    oLis[i].onclick=(function(i)
    {   

    　　return function()
    　　{
    　　　bgmNum = i;
            bgmselect = 0;
            console.log(bgmList[bgmNum]);
            setBgm(bgmList[bgmNum]);
            bgmStatue(bgmList[bgmNum],2);
    　　}
    }(i))
　　}
}
//function roomSetting() {
//  var roomId = getRoomid();
//  var ob = document.getElementById('roomnum');
//  ob.innerHTML = "房间00" + roomId;
//  var pos = getPosition();
//  if (pos == 0) {
//      alert("房主大人万福金安");
//  } else if (pos == 1) {
//      var playbutton = document.getElementById("control");
//      playbutton.parentNode.removeChild(playbutton);
//      var startbutton = document.getElementById("Start");
//      startbutton.parentNode.removeChild(startbutton);
//      alert("大人稍安勿躁，等等房主选择背景音乐后开始游戏");
//  }
//}
window.onload = function() {
    
}