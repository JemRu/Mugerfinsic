<?php
/*xin langyun 播放音乐
 * 
 * */
require_once('./storage/saestorage.class.php');
if(isset($_POST['musicname']) && $_POST['musicname']){
	$musicname = addslashes($_POST['musicname']);
	$ak = '32woy14lz4';
	#your app secretkey
	$sk = '0kkx2hy3y5z3miyj1310wwmmx12iwlz0ikhkkkk3';
	#your domain name
	$domain = 'music';
	$destFileName = $musicname.'.txt';
	$storage = new SaeStorage($ak, $sk);
	$fileContent = $storage->read($domain,$destFileName);
	echo json_encode($fileContent);
	/*$PATH = "../resources/".$musicname.".txt";
	if(file_exists($PATH)){
		$myflie = fopen($PATH, 'r') or die("unable to open file!");
		$content = fread($myflie,filesize($PATH));
		echo $content;
	}else{
		$response['statue'] = -2;
		echo json_encode($response);
		exit ;
	}*/
}else{
	$response['statue'] = -1;
	echo json_encode($response);
	exit ;
}


?>