        $(document).ready(function () {
            var sense;
            var imageSize;
            var handModule;
            var handConfiguration;

			//手势算法的一堆参数
            var last;
			var v=0;
			var count=0;
			var delx=0;
			var delz=0;
			var dely=0;
			var flagy=0;

			//声音上下文，点击开始的时候再创建
            var context1;

            // check platform compatibility
            RealSenseInfo(['hand'], function (info) {
                if (info.IsReady == true) {
                    $('#info').append('<b>Platform supports Intel(R) RealSense(TM) SDK feature</b>');
                    status('OK');
                    document.getElementById("Start").disabled = false;
                } else {
                    status('Platform not supported: ' + info.responseText);
                    if (info.IsPlatformSupported != true) {
                        $('#info').append('<b>Intel® RealSense™ 3D camera not found</b>');
                    } else if (info.IsBrowserSupported != true) {
                        $('#info').append('<b>Please update your browser to latest version</b>');
                    } else {
                        $('#info').append('<b>Please download and install the following update(s) before running sample: </b>');
                        for (i = 0; i < info.Updates.length; i++) {
                            $('#info').append('<a href="' + info.Updates[i].url + '">' + info.Updates[i].href + '</a><br>');
                        }
                    }
                }
            })

            $('#Start').click(function () {
            	
             	$(".shanshuo").css('display','block');
 				$('#myself').toggleClass('userWait').toggleClass('userReady');
				$('.start').css('display','none');
				$('.stop').css('display','block');               
            	setTimeout(function(){
            		$(".shanshuo").css('display','none');
	            document.getElementById("Start").disabled = true;
                PXCMSenseManager_CreateInstance().then(function (result) {
                    sense = result;
                    return sense.EnableHand(onHandData);
                }).then(function (result) {
                    handModule = result;
                    status('Init started');
                    return sense.Init(onConnect, onStatus);
                }).then(function (result) {
                    return handModule.CreateActiveConfiguration();
                }).then(function (result) {
                    handConfiguration = result;
                    if (document.getElementById("alerts").checked)
                        return handConfiguration.EnableAllAlerts();
                    else
                        return handConfiguration.DisableAllAlerts();
                }).then(function (result) {
                    if (document.getElementById("gestures").checked)
                        return handConfiguration.EnableAllGestures(false);
                    else
                        return handConfiguration.DisableAllGestures();
                }).then(function (result) {
                    return handConfiguration.ApplyChanges();
                }).then(function (result) {
                    return sense.QueryCaptureManager();
                }).then(function (capture) {
                    return capture.QueryImageSize(pxcmConst.PXCMCapture.STREAM_TYPE_DEPTH);
                }).then(function (result) {
                    imageSize = result.size;
                    return sense.StreamFrames();
                }).then(function (result) {
                    status('Streaming ' + imageSize.width + 'x' + imageSize.height);
                    document.getElementById("Stop").disabled = false;
                }).catch(function (error) {
                    status('Init failed: ' + JSON.stringify(error));
                    document.getElementById("Start").disabled = false;
                }); },3000); 
                context1 = new (AudioContext|| webkitAudioContext);
            });

            function clear() {
			    $('#alerts_status').text('');
                $('#gestures_status').text('');
				document.getElementById("Start").disabled = false;
            }
            
//          $('#control').click(function () {
//          	$('#control').removeClass("controlStart");
//          	$('#control').addClass("controlPause");
//          });	
            
            $('#Stop').click(function () {
            	$('#myself').toggleClass('userWait').toggleClass('userReady');
//				$('.stop').css('display','none');
//				$('.start').css('display','block');
                document.getElementById("Stop").disabled = true;
                sense.Close().then(function (result) {
                    status('Stopped');
                    clear();
                    var canvas = document.getElementById('myCanvas');
	                var context = canvas.getContext('2d');
	                var radius = 3;
	                var scale = 0.8;
	                canvas.width = 470;
	                canvas.height = 350;
	                context.strokeStyle="#449cc4";
			        context.lineWidth=10;
			        context.beginPath();
			        context.moveTo(10,350);
	                context.bezierCurveTo(10,-100,460,-100,460,350);
	                context.stroke();
	
	                context.fillStyle=  "rgba(65,154,196,0.6)";
	                context.fill();  		            
		            
                });
                location.href="../share_music.php";
            });
            
            function showMusic(){
            	$("#selectMusic").click(function(){
            		showAllMusic();
            	}) ;
            	selectMusic();
            }
            
            function showAllMusic(){
            	$("#allMusic").css('display','block');
            	$("#selectMusic").css('color','#CCCCCC');
            }
            
            function hideAllMusic(){
            	$("#allMusic").css('display','none');
            	$("#selectMusic").css('color','#000000');
            }
            
            function selectMusic(){
            	var pro = $("#allMusic li");
            	//	alert(pro.length);
            	var links;
            	for(var i=0;i<pro.length;i++){
            		links = pro[i].getElementsByTagName("a");
            		for(var j=0;j<links.length;j++){
            			links[j].onclick = function(){
            				$("#selectMusic").html($(this).text());
            				hideAllMusic();
            			}
            		}
            	}
            }
			showMusic();
			
            function onHandData(mid, module, data) {
                var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');
                var radius = 3;
                var scale = 0.8;
                canvas.width = 470;
                canvas.height = 350;
                 
                var color=context.createLinearGradient(0,0,canvas.width,0);
		        color.addColorStop("0","#49ab46");
		        color.addColorStop("0.3","#e53f39");
		        color.addColorStop("0.6","#fcd209");
		        color.addColorStop("1.0","#4285c6");
		        context.strokeStyle=color;
		        context.lineWidth=10;
		        context.beginPath();
		        context.moveTo(10,350);
                context.bezierCurveTo(10,-100,460,-100,460,350);
                context.stroke();

                context.fillStyle="#FFFFFF";
                context.fill();        
                var bayinqin = new Image();
                bayinqin.src = "img/play/bayinqin.png"
                context.drawImage(bayinqin,40,110);               
                
         
				var gesturestr = '' + JSON.stringify(data.gestures);
				//console.log(gesturestr);
				var gesturejs = gesturestr.slice(1,gesturestr.length-1);
				//console.log(gesturejs);
				if   (gesturejs){
					var gestures = JSON.parse(gesturejs);
					var gesture = gestures.name;
					console.log(gesture);
				}
				//var gestures = JSON.parse(gesturejs);
				//console.log(gesture);
 
                if (data.hands === undefined) return
                for (h = 0; h < data.hands.length; h++) {
                    var joints = data.hands[h].trackedJoint;
                    var baseX = 600-(joints[0].positionImage.x);
                    var baseY = joints[0].positionImage.y;
                    var wristX = 600-(joints[0].positionImage.x);
                    var wristY = joints[0].positionImage.y;

                    for (j = 0; j < joints.length; j++) {
                        if (joints[j] == null || joints[j].confidence <= 0) continue;

                        var x = 600-joints[j].positionImage.x;
                        var y = joints[j].positionImage.y;

                
                        if (j == 2 || j == 6 || j == 10 || j == 14 || j == 18) {
                            baseX = wristX;
                            baseY = wristY;
                            
                        }


                        
                             

                        var thumbx = (600-joints[5].positionImage.x) * scale;
						var thumby = (joints[5].positionImage.y) * scale;
                        var shizhix= (600-joints[9].positionImage.x) * scale;
						var shizhiy = (joints[9].positionImage.y) * scale;
                        var zhongzhix = (600-joints[joints.length-9].positionImage.x) * scale;
						var zhongzhiy = (joints[joints.length-9].positionImage.y) * scale;
                        var wumingzhix = (600-joints[joints.length-5].positionImage.x) * scale;
						var wumingzhiy = (joints[joints.length-5].positionImage.y) * scale;
                        var xiaozhix = (600-joints[joints.length-1].positionImage.x) * scale;
						var xiaozhiy = (joints[joints.length-1].positionImage.y) * scale;

                        if (gesture == "two_fingers_pinch_open")
						{
							
						}
						if (gesture == "full_pinch"){
							console.log("握拳是因为 我生气了不知道吗 蠢");
						} 
						if(0<shizhix&&shizhix<250){
							var guchui = new Image();
                            guchui.src = "img/play/guchui2.png"
		                    context.drawImage(guchui,shizhix-70,shizhiy); 
						}else if(shizhix>250){
							var guchui = new Image();
                            guchui.src = "img/play/guchui3.png"
		                    context.drawImage(guchui,shizhix,shizhiy); 							
						}
                    
 

                         
                    }
					if(count!=0){					
						var current=data.hands[0];
						var time=current.timeStamp;
						var lasttime=last.timeStamp;
						
						var sign=current.trackedJoint[9].positionWorld;
						var lastsign=last.trackedJoint[9].positionWorld;
						var distance=Math.sqrt((sign.x-lastsign.x)*(sign.x-lastsign.x)+(sign.y-lastsign.y)*(sign.y-lastsign.y)+(sign.z-lastsign.z)*(sign.z-lastsign.z));
						distance=(distance*100/((time-lasttime)/1e7));
						delx+=(sign.x-lastsign.x)*(sign.x-lastsign.x)*10000;
						delz+=(sign.z-lastsign.z)*(sign.z-lastsign.z)*10000;
						dely+=sign.y-lastsign.y;
						
						if(count%5!=0){
							v=v+distance;
						}
						else{
							v=v+distance;
							v=v/5;
							delx=delx/5;
							delz=delz/5;
							dely=dely/5;
							
							if(50<shizhix&&shizhix<100&&130<shizhiy&&shizhiy<400 && v>10&&delx<1.2&&delz<0.5&&dely<0){
                        
                      	
		                    	context.beginPath();
		                        context.arc(shizhix, shizhiy, radius, 0, 2 * Math.PI);
		                        context.lineWidth = 5;
		                        context.strokeStyle = 'red';
		                        context.stroke();  
		                        Audio_Play('my01', context1.currentTime);
		                      }
		                    
		                       if(100<shizhix&&shizhix<150&&130<shizhiy&&shizhiy<400&& v>10&&delx<1.2&&delz<0.5&&dely<0){
		               
                     	
		                    	context.beginPath();
		                        context.arc(shizhix, shizhiy, radius, 0, 2 * Math.PI);
		                        context.lineWidth = 5;
		                        context.strokeStyle = 'pink';
		                        context.stroke();  
		                        Audio_Play('my01', context1.currentTime);                    	
		                      }                      
		                        if(150<shizhix&&shizhix<200&&130<shizhiy&&shizhiy<400&& v>10&&delx<1.2&&delz<0.5&&dely<0){
		               
                     	
		                    	context.beginPath();
		                        context.arc(shizhix, shizhiy, radius, 0, 2 * Math.PI);
		                        context.lineWidth = 5;
		                        context.strokeStyle = 'blue';
		                        context.stroke();  
		                        Audio_Play('my01', context1.currentTime);                    	
		                      }                         
		                       if(200<shizhix&&shizhix<250&&130<shizhiy&&shizhiy<400&& v>10&&delx<1.2&&delz<0.5&&dely<0){
		          
                      	
		                    	context.beginPath();
		                        context.arc(shizhix, shizhiy, radius, 0, 2 * Math.PI);
		                        context.lineWidth = 5;
		                        context.strokeStyle = 'green';
		                        context.stroke();  
		                        Audio_Play('my01', context1.currentTime);                    	
		                      }                        
		                       if(250<shizhix&&shizhix<300&&130<shizhiy&&shizhiy<400&& v>10&&delx<1.2&&delz<0.5&&dely<0){
                       	
		                    	context.beginPath();
		                        context.arc(shizhix, shizhiy, radius, 0, 2 * Math.PI);
		                        context.lineWidth = 5;
		                        context.strokeStyle = 'tomato';
		                        context.stroke();  
		                        Audio_Play('my01', context1.currentTime);                    	
		                      }
		                       if(300<shizhix&&shizhix<340&&130<shizhiy&&shizhiy<400&& v>10&&delx<1.2&&delz<0.5&&dely<0){
		                     
                       	
		                    	context.beginPath();
		                        context.arc(shizhix, shizhiy, radius, 0, 2 * Math.PI);
		                        context.lineWidth = 5;
		                        context.strokeStyle = 'palegreen';
		                        context.stroke();  
		                        Audio_Play('my01', context1.currentTime);                    	
		                      }                             
		                          
		                        if(340<shizhix&&shizhix<380&&130<shizhiy&&shizhiy<300&& v>10&&delx<1.2&&delz<0.5&&dely<0){
		                  
                         	
		                    	context.beginPath();
		                        context.arc(shizhix, shizhiy, radius, 0, 2 * Math.PI);
		                        context.lineWidth = 5;
		                        context.strokeStyle = 'black';
		                        context.stroke();  
		                        Audio_Play('my01', context1.currentTime);                    	
		                      }                            
		                      
		                       if(380<shizhix&&shizhix<410&&130<shizhiy&&shizhiy<400&& v>10&&delx<1.2&&delz<0.5&&dely<0){
		                       
                      	
		                    	context.beginPath();
		                        context.arc(shizhix, shizhiy, radius, 0, 2 * Math.PI);
		                        context.lineWidth = 5;
		                        context.strokeStyle = 'palegreen';
		                        context.stroke();  
		                        Audio_Play('my01', context1.currentTime);                    	
		                      }
							v=0;
							delx=0;
							delz=0;
							dely=0;
						}	
					}
					count++;
					last=data.hands[0];

                }
                
            }

            function onConnect(data) {
                if (data.connected == false) {
                    $('#alerts_status').append('Alert: ' + JSON.stringify(data) + '<br>');
                }
            }

            function onStatus(data) {
                if (data.sts < 0) {
                    status('Error ' + data.sts);
                    clear();
                }
            }

            function status(msg) {
                $('#status').text(msg);
            }
        });
  