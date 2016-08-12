<?php
/*开始游戏
 * 
 * */
include '../mysqli/opDB.class.php';
$mysqli = new opDB();
$response = array("statue" => '');
if (isset($_POST['name']) && isset($_POST['roomid']) && $_POST['name'] && $_POST['roomid']
	&& isset($_POST['gamestatue']) && $_POST['gamestatue']) {
	$name = addslashes($_POST['name']);
	$roomid = $_POST['roomid'];
	$gamestatue = $_POST['gamestatue'];
	$sql = "SELECT * FROM rooms WHERE roomid='{$roomid}'&&play01='{$name}'";
	if($mysqli->excute_dql($sql)==0){
		$sql = "UPDATE rooms SET gamestatue='$gamestatue'WHERE roomid='{$roomid}'";
		if($mysqli->excute_dml($sql)==0){
		   	$response['statue'] = 0;
			echo json_encode($response);
			exit ;
		}else{
			$response['statue'] = -3;
			echo json_encode($response);
			exit ;
		}
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