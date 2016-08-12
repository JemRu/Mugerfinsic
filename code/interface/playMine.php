<?php
/*播放音乐
 * 
 * */
if(isset($_POST['musicname']) && $_POST['musicname']){
	$musicname = addslashes($_POST['musicname']);
	$PATH = "../resources/".$musicname.".txt";
	if(file_exists($PATH)){
		$myflie = fopen($PATH, 'r') or die("unable to open file!");
		$content = fread($myflie,filesize($PATH));
		echo $content;
	}else{
		$response['statue'] = -2;
		echo json_encode($response);
		exit ;
	}
}else{
	$response['statue'] = -1;
	echo json_encode($response);
	exit ;
}


?>