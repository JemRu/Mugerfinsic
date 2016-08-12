<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
		<!--<script type="text/javascript" src="js/audio_ajax.js"></script>-->

		<script>
			var AudioContext = window.AudioContext || window.webkitAudioContext;
			var audioCtx = new AudioContext();
			function CreateContext(){
				var AudioContext = window.AudioContext || window.webkitAudioContext;
				var audioCtx = new AudioContext();
				console.log("success");
				return audioCtx;
			}
			function getTime(){
				//var audioCtx = CreateContext();
				console.log(audioCtx.currentTime);
			}
			//audioContext对象创建的时候开始计时~
			window.onbeforeunload=function(){
			    if(document.all){
			       	if(event.clientY<0){
			            return "确定要离开吗？";
			        }
			    }else{
			        return "确定要离开吗？23333";
			    }
			}
		</script>
	</head>
	<body>
		<input type="button" onclick="CreateContext()" value="创建对象"></input>
		<input type="button" onclick="getTime()" value="开始计时"></input>
	</body>
</html>