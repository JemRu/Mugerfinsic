<!DOCTYPE html>
<html>
	<head>
		<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
		<script type="text/javascript" src="js/audio_ajax.js"></script>

		<script>
			function update_Ajax(data1){
				var data = {
					Buffer_id : "id",
					Buffer_time : "time"
				};
			    $.ajax({
			        url: 'interface/putdata.php',
			        type: 'POST',
			        data: {data1:data, roomid:9},
					success:function(data){
						console.log(data);
						
					}
			    });
			}

			var Number = 1;
			var roomId = 9;
			setInterval(function(){

				$.ajax({
			        url: 'interface/getdata.php',
			        type: 'POST',
			        data: {num:Number,roomid:roomId},
			        success:function(data){
						if(data==''|| data==undefined || data==-1 || data==-2){

						}else{
							var datainfo = eval("("+data+")");
							Number = Number+datainfo.length;
							console.log(Number);
							console.log(datainfo);
						}
			        }
			    });
			},1000);
		</script>
	</head>
	<body>
		<button type="button" onclick="update_Ajax(10)"></button>
	</body>
</html>