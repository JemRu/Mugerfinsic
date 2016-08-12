<?php
/*快速加入
 *
 * */
include '../mysqli/opDB.class.php';
$mysqli = new opDB();
$response = array("roomid" => '');
if (isset($_POST['roomid']) && $_POST['roomid']) {
	$roomid = $_POST['roomid'];
	if ($roomid == -1) {
		$sql = "select roomid from rooms where num>1 and num!=4 limit 1";
		$res = $mysqli -> get_result($sql);
		if ($row = mysqli_fetch_assoc($res)) {
			echo json_encode($row);
			$mysqli -> for_close();
			exit ;
		} else {
			//没有房间可以加入了
			$response['roomid'] = -2;
			echo json_encode($response);
			exit ;
		}
	} else {
		if ($roomid <= 9 && $roomid > 0) {
			$sql = "select num from rooms where roomid='{$roomid}'";
			$res = $mysqli -> get_result($sql);
			$row = mysqli_fetch_assoc($res);
			if ($row['num'] == 4) {
				/*房间满了
				 * */
				$response['roomid'] = -4;
				echo json_encode($response);
				exit ;
			} elseif ($row['num'] == 0) {
				/*房间没有人创建
				 *
				 * */
				$response['roomid'] = -5;
				echo json_encode($response);
				exit ;
			} else {
				$response['roomid'] = 0;
				echo json_encode($response);
				exit ;
			}
		} else {
			/*没有这个房间
			 *
			 * */
			$response['roomid'] = -3;
			echo json_encode($response);
			exit ;
		}
	}
} else {
	$response['roomid'] = -1;
	echo json_encode($response);
	exit ;
}
?>