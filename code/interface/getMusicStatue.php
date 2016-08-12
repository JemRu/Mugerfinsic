<?php
/*获取音乐列表状态
 * 
 * */
$musicname = "zhaoshuai";
$PATH = "../resources/zhaoshuai.txt";
$myfile = fopen($PATH, 'w+') or die("Unable to open file!");
if(fread($myfile, filesize($PATH)==2)){
	fwrite($myfile,1);
	fclose($myfile);
	$response['liststatue'] = 2;
	echo json_encode($response);
	exit ;
}else{
	fclose($myfile);
	$response['liststatue'] = 1;
	echo json_encode($response);
	exit ;
}



?>