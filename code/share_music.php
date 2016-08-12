<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="css/share.css" />
		<meta charset="utf-8">
		<title>shareMusic</title>
		<script src="js/jquery-1.11.0.min.js" type="text/javascript" charset="utf-8" async defer></script>
		<script src="js/selectCookie.js" type="text/javascript" charset="utf-8" async defer></script>
		<script type="text/javascript" src="js/audio_select.js" ></script>
        <script type="text/javascript" src="js/audio_ajax.js" ></script>
        <script type="text/javascript" src="js/bufferLoader.js" ></script>
     	<script type="text/javascript" src="js/audio_load.js" ></script>
     	<script src="js/shareMusic.js" type="text/javascript" charset="utf-8" async defer></script>
	</head>
	<body>
		<div id="music2" class="music_list">
                <div class="mymusic">
                    <div class="name">
                        最新音乐             
                    </div>
                	<div class="music">
                    	<a class="playSMusic" id="falsename" href="#">正在努力加载中...</a>
                	</div>
                </div>          
		</div>
		<div class="right">
			<div class="share">
				<a id="share" href="#"><img src="img/play/share.png"></a>
				<div class="detail1">留下这个声音，点击分享</div>
			</div>
			<div class="again">
				<a id="playagain" href="#"><img src="img/play/again.png"></a>
				<div class="detail2">再玩一次，返回游戏界面</div>
			</div>			
		</div>
		<audio id="bgm_audioShare" src=""></audio>
	</body>
</html>
