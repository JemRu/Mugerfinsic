<?php
/*背景音乐
 * 
 * */
include '../mysqli/opDB.class.php';
$mysqli = new opDB();
$response = array("statue" => '');
if (isset($_POST['name']) && isset($_POST['roomid']) && $_POST['name'] && $_POST['roomid']
 	&& isset($_POST['bgmname']) && $_POST['bgmname'] && $_POST['bgmstatue'] && isset($_POST['bgmstatue']))  {
 	$name = addslashes($_POST['name']);
	$roomid = $_POST['roomid'];
	$bgmname = addslashes($_POST['bgmname']);
	$bgmstatue = addslashes($_POST['bgmstatue']);
	$sql = "UPDATE rooms SET bgmname='{$bgmname}',bgmstatue='{$bgmstatue}' where roomid='{$roomid}'";
	if($mysqli->excute_dml($sql)==0){
		$response['statue'] = 0;
		echo json_encode($response);
		exit ;
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