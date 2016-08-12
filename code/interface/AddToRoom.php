<?php
/*加入房间
 *
 *
 * */
include '../mysqli/opDB.class.php';
$mysqli = new opDB();
$response = array("statue" => '');
if (isset($_POST['name']) && isset($_POST['roomid']) 
	&& $_POST['name'] && $_POST['roomid'] 
	&& isset($_POST['ins']) && $_POST['ins']) {
	$name = addslashes($_POST['name']);
	$roomid = addslashes($_POST['roomid']);
	//甜儿改
	$ins = addslashes($_POST['ins']);
	$sql = "select num from rooms where roomid='{$roomid}'";
	$result = $mysqli -> get_result($sql);
	if ($row = mysqli_fetch_assoc($result)) {
		$id = $row['num'];
		if ($id <= 4 && $id >= 1) {
			$sql = "UPDATE rooms SET num=num+1,play0$id='{$name}',ins0$id='{$ins}' where roomid = '{$roomid}'";
			if ($mysqli -> excute_dml($sql) == 0) {
				$response['statue'] = 0;
				echo json_encode($response);
				exit ;
			} else {
				//服务器崩溃
				$response['statue'] = -3;
				echo json_encode($response);
				exit ;
			}
		} else {
			//房间满了
			$response['statue'] = -2;
			echo json_encode($response);
			exit ;
		}
	}
} else {
	$response['statue'] = -1;
	echo json_encode($response);
	exit ;
}
?>