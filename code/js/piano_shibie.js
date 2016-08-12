        var currentStamp = 0;
        $(document).ready(function () {
            var sense;
            var imageSize;
            var handModule;
            var handConfiguration;
            
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
                    //设置数据处理器
                    handModule.onFrameProcessed = onHandData;
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
                }); 
                },3000);           	


                context1 = new (AudioContext|| webkitAudioContext);
                //点击开始创建audio对象，建立时间轴
            });

            function clear() {
			    $('#alerts_status').text('');
                $('#gestures_status').text('');
				document.getElementById("Start").disabled = false;
            }
//          
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
                var radius = 2;
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
                var jianpan = new Image();  
                jianpan.src = "img/play/keyboard.png"
                context.drawImage(jianpan,15,230);
                              
         
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

                        context.beginPath();
                        context.arc(x * scale, y * scale, radius, 0, 2 * Math.PI);
                        
                        context.lineWidth = 8;
                        context.strokeStyle ="#4cb8c5";
                        context.stroke();
                
                        if (j == 2 || j == 6 || j == 10 || j == 14 || j == 18) {
                            baseX = wristX;
                            baseY = wristY;
                            
                        }

                        context.beginPath();
                        context.moveTo(baseX * scale, baseY * scale);
                        context.lineTo(x * scale, y * scale);
                        context.stroke();
                        
                             

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
                           
				   
                      
                      
 

//                     if(20<thumbx&&thumbx<110&&thumby>235&& data.hands[0].fingerData[0].foldedness==90 && currentStamp==0){
//						
//						
//                      currentStamp = 1;
//                      Audio_Play('piano6', context1.currentTime);
//						var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m1.png";
//		                context.drawImage(pianoNum,40,200);
//                      
//                }
//
//
//                     if(120<thumbx&&thumbx<155&&thumby>235&& data.hands[0].fingerData[0].foldedness==90 && currentStamp==0){
//                     	
//
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano7', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m2.png";
//		                context.drawImage(pianoNum,120,200); 
//                          
//                      
//                }
//                     
//
//
//                     if(170<thumbx&&thumbx<230&&thumby>235&& data.hands[0].fingerData[0].foldedness==90 && currentStamp==0){
//
//                      
//
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano8', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m3.png";
//		                context.drawImage(pianoNum,200,200);
//                       
//                }                       
//
//                     if(245<thumbx&&thumbx<305&&thumby>235&& data.hands[0].fingerData[0].foldedness==90 && currentStamp==0){
//                      
//
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano9', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m4.png";
//		                context.drawImage(pianoNum,275,200);
// 
//                      
//                       
//                }   
//
//                     if(320<thumbx&&thumbx<380&&thumby>235&& data.hands[0].fingerData[0].foldedness==90 && currentStamp==0){
//                      
//
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano10', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m5.png";
//		                context.drawImage(pianoNum,350,200);
//
//                       
//                } 
//
//                     if(395<thumbx&&thumbx<430&&thumby>235&& data.hands[0].fingerData[0].foldedness==90 && currentStamp==0){
//                      
//     
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano11', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m6.png";
//		                context.drawImage(pianoNum,430,200);
//
//                       
//                } 
//                     if(440<thumbx&&thumbx<510&&thumby>235&& data.hands[0].fingerData[0].foldedness==90 && currentStamp==0){
//                      
//
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano12', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m7.png";
//		                context.drawImage(pianoNum,500,200);
//
//                       
//                } 
                        baseX = x;
                        baseY = y;
						
//-----------------------------------------------shizhi----------------------------------------------------------------------------
						 if(20<shizhix&&shizhix<65&&shizhiy>235&& data.hands[0].fingerData[1].foldedness==90 && currentStamp==0){
                       	
   
                         
                        currentStamp = 1;
                        Audio_Play('piano6', context1.currentTime);
						var pianoNum = new Image();  
		                pianoNum.src = "img/play/m1.png";
		                context.drawImage(pianoNum,40,200);

                        
                         
                  }


                       if(80<shizhix&&shizhix<125&&shizhiy>235&& data.hands[0].fingerData[1].foldedness==90 && currentStamp==0){
                       	
   
                         
                        currentStamp = 1;
                        Audio_Play('piano7', context1.currentTime);
                        var pianoNum = new Image();  
		                pianoNum.src = "img/play/m2.png";
		                context.drawImage(pianoNum,120,200); 
                        
                         
                         
                  }
                       
                       if(140<shizhix&&shizhix<185&&shizhiy>235&& data.hands[0].fingerData[1].foldedness==90 && currentStamp==0){
                        

                         
                        currentStamp = 1;
                        Audio_Play('piano8', context1.currentTime);
                        var pianoNum = new Image();  
		                pianoNum.src = "img/play/m3.png";
		                context.drawImage(pianoNum,200,200);
                        
                         
                         
                  }                       

                       if(200<shizhix&&shizhix<245&&shizhiy>235&& data.hands[0].fingerData[1].foldedness==90 && currentStamp==0){
                        
    
                         
                        currentStamp = 1;
                        Audio_Play('piano9', context1.currentTime);
                        var pianoNum = new Image();  
		                pianoNum.src = "img/play/m4.png";
		                context.drawImage(pianoNum,275,200);
                        
                         
                         
                  }   

                       if(260<shizhix&&shizhix<305&&shizhiy>235&& data.hands[0].fingerData[1].foldedness==90 && currentStamp==0){
                        

                         
                        currentStamp = 1;
                        Audio_Play('piano10', context1.currentTime);
                        var pianoNum = new Image();  
		                pianoNum.src = "img/play/m5.png";
		                context.drawImage(pianoNum,350,200);
                        
                         
                         

                  } 

                       if(320<shizhix&&shizhix<365&&shizhiy>235&& data.hands[0].fingerData[1].foldedness==90 && currentStamp==0){
   
                         
                        currentStamp = 1;
                        Audio_Play('piano11', context1.currentTime);
                        var pianoNum = new Image();  
		                pianoNum.src = "img/play/m6.png";
		                context.drawImage(pianoNum,430,200);
                        
                  } 
                       if(380<shizhix&&shizhix<425&&shizhiy>235&& data.hands[0].fingerData[1].foldedness==90 && currentStamp==0){
                        

                         
                        currentStamp = 1;
                        Audio_Play('piano12', context1.currentTime);
                        var pianoNum = new Image();  
		                pianoNum.src = "img/play/m7.png";
		                context.drawImage(pianoNum,500,200);
                        
                         
                         

                  } 
                      
//-----------------------------------------------zhongzhi----------------------------------------------------------------------------
//						if(20<zhongzhix&&zhongzhix<110&&zhongzhiy>235&& data.hands[0].fingerData[2].foldedness==90 && currentStamp==0){
//                     	
// 
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano6', context1.currentTime);
//						var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m1.png";
//		                context.drawImage(pianoNum,40,200);
//
//                      
//                        
//                }
//
//
//                     if(120<zhongzhix&&zhongzhix<155&&zhongzhiy>235&& data.hands[0].fingerData[2].foldedness==90 && currentStamp==0){
//                     	
//
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano7', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m2.png";
//		                context.drawImage(pianoNum,120,200); 
//                      
//                       
//                }
//                     
//                     if(170<zhongzhix&&zhongzhix<230&&zhongzhiy>235&& data.hands[0].fingerData[2].foldedness==90 && currentStamp==0){
//                      
//  
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano8', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m3.png";
//		                context.drawImage(pianoNum,200,200);
//                      
//                        
//                }                       
//
//                     if(245<zhongzhix&&zhongzhix<305&&zhongzhiy>235&& data.hands[0].fingerData[2].foldedness==90 && currentStamp==0){
//                      
//   
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano9', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m4.png";
//		                context.drawImage(pianoNum,275,200);
//                      
//                        
//                }   
//
//                     if(320<zhongzhix&&zhongzhix<380&&zhongzhiy>235&& data.hands[0].fingerData[2].foldedness==90 && currentStamp==0){
//                      
//
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano10', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m5.png";
//		                context.drawImage(pianoNum,350,200);
//                      
//                        
//                } 
//
//                     if(395<zhongzhix&&zhongzhix<430&&zhongzhiy>235&& data.hands[0].fingerData[2].foldedness==90 && currentStamp==0){
//                      
//         
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano11', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m6.png";
//		                context.drawImage(pianoNum,430,200);
//                      
//                       
//                } 
//                     if(440<zhongzhix&&zhongzhix<510&&zhongzhiy>235&& data.hands[0].fingerData[2].foldedness==90 && currentStamp==0){
//                      
//
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano12', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m7.png";
//		                context.drawImage(pianoNum,500,200);
//                      
//                        
//                } 
                      
//-----------------------------------------------wuming----------------------------------------------------------------------------
//						 if(20<wumingzhix&&wumingzhix<110&&wumingzhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                     	
//   
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano6', context1.currentTime);
//						var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m1.png";
//		                context.drawImage(pianoNum,40,200);
//
//                      
//                       
//                }
//
//
//                     if(120<wumingzhix&&wumingzhix<155&&wumingzhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                     	
//             
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano7', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m2.png";
//		                context.drawImage(pianoNum,120,200); 
//                      
//                        
//                }
//                     
//                     if(170<wumingzhix&&wumingzhix<230&&wumingzhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                      
//        
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano8', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m3.png";
//		                context.drawImage(pianoNum,200,200);
//                      
//                        
//                }                       
//
//                     if(245<wumingzhix&&wumingzhix<305&&wumingzhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                      
//                 
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano9', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m4.png";
//		                context.drawImage(pianoNum,275,200);
//                      
//                        
//                }   
//
//                     if(320<wumingzhix&&wumingzhix<380&&wumingzhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                      
//    
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano10', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m5.png";
//		                context.drawImage(pianoNum,350,200);
//                      
//                        
//                } 
//
//                     if(395<wumingzhix&&wumingzhix<430&&wumingzhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                      
//                
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano11', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m6.png";
//		                context.drawImage(pianoNum,430,200);
//                      
//                       
//                } 
//                     if(440<wumingzhix&&wumingzhix<510&&wumingzhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                      
//             
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano12', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m7.png";
//		                context.drawImage(pianoNum,500,200);
//                      
//                        
//                } 
                      
				  
//-----------------------------------------------xiaozhi----------------------------------------------------------------------------
//						 if(20<xiaozhix&&xiaozhix<110&&xiaozhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                     	
//              
//						
//						//console.log(JSON.stringify(data.gestures[g]));
//						 
//                      currentStamp = 1;
//                      Audio_Play('piano6', context1.currentTime);
//						var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m1.png";
//		                context.drawImage(pianoNum,40,200);
//
//                      
//                       
//                }
//
//
//                     if(120<xiaozhix&&xiaozhix<155&&xiaozhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                     	
//             
//                      currentStamp = 1;
//                      Audio_Play('piano7', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m2.png";
//		                context.drawImage(pianoNum,120,200); 
//                      
//                        
//                }
//                     
//                     if(170<xiaozhix&&xiaozhix<230&&xiaozhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                      
//                 
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano8', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m3.png";
//		                context.drawImage(pianoNum,200,200);
//                      
//                        
//                }                       
//
//                     if(245<xiaozhix&&xiaozhix<305&&xiaozhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                      
//                     
//                      currentStamp = 1;
//                      Audio_Play('piano9', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m4.png";
//		                context.drawImage(pianoNum,275,200);
//                      
//                        
//                }   
//
//                     if(320<xiaozhix&&xiaozhix<380&&xiaozhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                      
//                      
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano10', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m5.png";
//		                context.drawImage(pianoNum,350,200);
//                      
//                        
//                } 
//
//                     if(395<xiaozhix&&xiaozhix<430&&xiaozhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                      
//     
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano11', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m6.png";
//		                context.drawImage(pianoNum,430,200);
//                      
//                        
//                } 
//                     if(440<xiaozhix&&xiaozhix<510&&xiaozhiy>235&& data.hands[0].fingerData[3].foldedness==90 && currentStamp==0){
//                      
//                    
//                       
//                      currentStamp = 1;
//                      Audio_Play('piano12', context1.currentTime);
//                      var pianoNum = new Image();  
//		                pianoNum.src = "img/play/m7.png";
//		                context.drawImage(pianoNum,500,200);
//                      
//                        
//                } 
//                    
//					
//					setTimeout(function(){
//                      currentStamp = 0;
//                  },1000);
//                  
              }


                }
                for (a = 0; a < data.alerts.length; a++) {
                    $('#alerts_status').text('Alert: ' + JSON.stringify(data.alerts[a]));

                    
                }
                for (g = 0; g < data.gestures.length; g++) {
                    $('#gestures_status').text('Gesture: ' + JSON.stringify(data.gestures[g]));
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
  