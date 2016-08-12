<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>演奏界面</title>
		<link href="css/YanZouStyle.css" type="text/css" rel="stylesheet"/>
		<link href="css/teach.css" type="text/css" rel="stylesheet"/>		
		<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="js/promise-1.0.0.min.js"></script>
        <script type="text/javascript" src="js/realsense.js"></script>
        <script type="text/javascript" src="js/realsenseinfo.js"></script>
        <script type="text/javascript" src="js/selectCookie.js"></script>
        <script type="text/javascript" src="js/audio_select.js" ></script>
        <script type="text/javascript" src="js/audio_ajax.js" ></script>
        <script type="text/javascript" src="js/bufferLoader.js" ></script>
     	<script type="text/javascript" src="js/audio_load.js" ></script>
        <script type="text/javascript" src="js/together_Event.js" ></script>
        <!--<script type="text/javascript" src="js/playload.js" ></script>-->
        <script src="js/piano_shibie.js"></script>
        <script src="js/hehe.js"></script>
	</head>
	<body>
		<div class="top">
			<div class="room">
				<div id="roomnum" class="room-font">房间</div>
			</div>
			<audio id="bgm_audio" src=""></audio>
			<div class="select" >
				<span id="selectMusic">请选择背景音乐</span>
				<ul id="allMusic" class="show">
					<li><b>1</b><a data="audio/bgm/BLISS.mp3" href="#">BLISS</a></li>
					<li><b>2</b><a data="audio/bgm/ClannadRemix" href="#">ClannadRemix</a></li>
                    <li><b>3</b><a data="audio/bgm/NEXTTOYOU" href="#">NEXTTOYOU</a></li>
                    <li><b>4</b><a data="audio/bgm/天空之城" href="#">天空之城</a></li>
                    <li><b>5</b><a data="audio/bgm/天之痕" href="#">天之痕</a></li>
                    <li><b>6</b><a data="audio/bgm/小苹果" href="#">小苹果</a></li>
                    <li><b>7</b><a data="audio/bgm/小星星" href="#">小星星</a></li>
                    <li><b>8</b><a data="audio/bgm/雪之梦" href="#">雪之梦</a></li>
                    <li><b>9</b><a data="audio/bgm/与你同在" href="#">与你同在</a></li>
				</ul>
			</div>
			
		</div>
		<div class="middle">

		</div>
		<div class="controlStart" id="control"></div>
		<!--<div class="end" >
			<div class="fx"><a href="shareMusic.php"><img src="img/play/fx.png"></a></div>
			<div class="cb"><a href="index.php"><img src="img/play/cb.png"></a></div>
		</div>
		<script>
		$(".controlStart").click(function(){
			$(this).css("display","none");
			$(".end").css("display","block");
		})
		
		</script>		-->
		<canvas class="bottom-middle" id="myCanvas">
			<input id="gestures" type="checkbox" checked="checked"/>Gestures
            <input id="alerts" type="checkbox" checked="checked"/>Alerts
		
		            <div id="gestures_status"></div>
            <div id="alerts_status"></div>
            <br>
            Status:<div id="status"></div>
		<script>
		 
		    var canvas=document.getElementById("myCanvas");
		    var context=canvas.getContext("2d");
		    context.strokeStyle="#449cc4";
		    context.lineWidth=4;
		    context.beginPath();
		    context.fillStyle=  "rgba(65,154,196,0.6)";
		    context.moveTo(5,150);
            context.bezierCurveTo(5,-45,297,-45,297,150);
            context.fill();
            context.stroke();

        </script>		
		</canvas>	
		<div class="shanshuo"><img src="img/play/daojishi.gif"></div>			
		<div class="start" id="Start"></div>
		<div class="stop" id="Stop"></div>
		<footer id="footer">
	      <div class="copyright">
	        <p>&copy;ING STUDIO</p>
	        <p>
	          <a href="mailto:jemming@foxmail.com?Subject=Hello%20again" target="_top">Content Us</a>
	        </p>
	        <p>
	          <a href="http://ingzone.com/">About Us</a>
	        </p>
	        <p>
	          <a href="http://www.intel.com/content/www/us/en/architecture-and-technology/realsense-overview.html">Intel® RealSense™</a>
	        </p>
	      </div>
	    </footer><!-- footer -->	
	    
		<script>
			LOAD();
			//roomSetting();
			//playBgm();
			//onclickList();
			var Number = 1;
		    var roomId = getRoomid();
		    setInterval(function(){
		        $.ajax({
		            url: 'interface/getData.php',
		            type: 'POST',
		            data: {
		                num:Number,
		                roomid:roomId
		            },
		            success:function(data){
		            //后台返回gamestatues,bgmname,bgmstatue,Buffer_id,Buffer_time,play01,play02
		            //play03,play04,statue01,statue02,statues03,statue04,
		            //ins01,ins02,ins03,ins04
		            	var datainfo = eval("("+data+")");
		                if(datainfo.statue == ''|| datainfo.statue == -1|| datainfo.statue == -2){
		                    console.log("还没有数据返回哟");
		                }else{
		                    if(datainfo.length!=undefined){
		                    	Number = Number + datainfo.length;
		                    }
		                    //处理Buffer_id,Buffer_time
		                    Play(datainfo);
		                    //处理gamestatue,房主点击START、END按钮改变状态
		                    DealGameStatue(datainfo);
		                    //处理bgmstatue,房主点击音频的开始按钮时改变
		                    DealBgmStatue(datainfo);
		                    //处理statue01~04
		                    DealStatue(datainfo);
		                }
		            }
		        });
		        if(currentStamp==1){
					currentStamp = 0;
				}
		    },500);
        </script>
		
		<div id="backg">
			<div class="inback">
				<div class="inhead">
					<img src="img/play/guide1.png"  class="img-1"/>
					<p class="head-p">点击开始进入准备状态</p>
				</div>
				<div class="inbody">
					<img src="img/play/guide_1.png" class="last" id="last1" />
					<img src="img/play/guide_3.png" class="img-2"  />
					<img src="img/play/guide_2.png" class="next"  id="next1" />
				</div>
				<div class="inbottom">
					<button class="pass">跳过</button>
				</div>
			</div>
			<!--第二步-->
			<div class="inback2" >
				<div class="inhead">
					<img src="img/play/guide2.png"  class="img-1"/>
					<p class="head-p">玩家准备完毕游戏开始</p>
				</div>
				<div class="inbody" style="margin-top: 5%;">
					<img src="img/play/guide_1.png" class="last" id="last2" />
					<img src="img/play/teach-21.png" class="img-2" style="margin-right:8%;" />
					<img src="img/play/guide_4.png" class="img-3"  />
					<img src="img/play/guide_2.png" class="next"  id="next2" />
				</div>
				<div class="inbottom">
					<button class="pass">跳过</button>
				</div>
			</div>
			<!--第san步-->
			<div class="inback3" >
				<div class="inhead">
					<img src="img/play/guide3.png"  class="img-1"/>
					<p class="head-p">手势指挥进行乐曲演奏</p>
				</div>
				<div class="inbody">
					<img src="img/play/guide_1.png" class="last" id="last3" />
					<img src="img/play/teach-31.png" class="img-2" style="margin-top:-100px;" />
					<img src="img/play/guide_5.png" class="img-3" style="margin-top:-100px;"/>
					<img src="img/play/guide_2.png" class="next"  id="next3" />
				</div>
				<div class="inbottom">
					<button class="pass">跳过</button>
		
				</div>
			</div>
			<!--第si步-->
			<div class="inback4" >
				<div class="inhead">
					<img src="img/play/guide4.png"  class="img-1"/>
					<p class="head-p">乐曲演奏完毕结束退出</p>
				</div>
				<div class="inbody">
					<img src="img/play/guide_1.png" class="last" id="last4" />
					<img src="img/play/teach-41.png" class="img-2"  style="margin-top:-100px;" />
					<img src="img/play/guide_6.png" class="img-3"  style="margin-top:-100px;" />
					<img src="img/play/guide_2.png" class="next"  id="next4" />
				</div>
				<div class="inbottom">
			
					<button class="next" id="finish">完成</button>
				</div>
			</div>
		</div>
		
<!--		<button id="show">learn</button>-->
		
		<script type="text/javascript">
			$(document).ready(function(){
				//演示
				$("#show").click(function(){
					$("#backg").show(500);
				});
				//演示步骤的进行
				$("#next1").click(function(){
					$(".inback").hide(500);
					$(".inback2").show(500);
				});
				
				$("#next2").click(function(){
					$(".inback2").hide(500);
					$(".inback3").show(500);
				});
				
				$("#next3").click(function(){
					$(".inback3").hide(500);
					$(".inback4").show(500);
				});
				
				$("#last4").click(function(){
					$(".inback4").hide(500);
					$(".inback3").show(500);
				});
				
				$("#last2").click(function(){
					$(".inback2").hide(500);
					$(".inback1").show(500);
				});
				
				$("#last3").click(function(){
					$(".inback3").hide(500);
					$(".inback2").show(500);
				});
				
				$("#finish").click(function(){
					
					$("#backg").hide(500);
					$(".inback4").hide(500);
					$(".inback").show(500);
				});
				//跳过演示
				$(".pass").click(function(){
					$("#backg").hide(500);
				});
			});
		</script>
	</body>
</html>
