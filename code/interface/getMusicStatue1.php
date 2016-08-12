<?php
/*获取音乐列表状态
 * 
 * */
require_once('./storage/saestorage.class.php');
$musicname = "zhaoshuai";	
$ak = '32woy14lz4';
#your app secretkey
$sk = '0kkx2hy3y5z3miyj1310wwmmx12iwlz0ikhkkkk3';
#your domain name
$domain = 'music';
$FileName = $musicname.'.txt';	
$storage = new SaeStorage($ak, $sk);
$fileContent = $storage->read($domain,$FileName);
if($fileContent==2){
	$destFileName = $musicname.'.txt';
	$content = 1;
	$attr = array('encoding'=>'gzip');
	$storage->write($domain,$destFileName, $content, -1, $attr, false);
	$response['liststatue'] = 2;
	echo json_encode($response);
	exit ;
}else{
	$response['liststatue'] = 2;
	echo json_encode($response);
	exit ;
}
	
?>