<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include '../mysqli/opDB.class.php';
$con = new opDB();
$response = array("statue" => '');
if (isset($_POST['num']) && $_POST['num'] && isset($_POST['roomid']) && $_POST['roomid']) {
	$number = addslashes($_POST['num']);
	$roomid = addslashes($_POST['roomid']);
	$sql = "select * from rooms as r where r.roomid=$roomid";
	$res1 = $con -> get_result($sql);
	$row1 = array();
	if ($row1 = mysqli_fetch_assoc($res1)) {
		$jason = array();
		$rr = array_merge_recursive($jason, $row1);
		$i = 0;
		$sql2 = "select * from room$roomid";
		if ($con -> excute_dql($sql2) == 0) {
			$res2 = $con -> get_result($sql2);
			while ($row = mysqli_fetch_assoc($res2)) {
				if ($i > $number) {
					$row = array_merge_recursive($row, $row1);
					array_push($jason, $row);
				}

				$i++;
			}
			if (!empty($jason)) {
				echo json_encode($jason);
				exit ;
			} else {
				$arr = array("Buffer_id" => '', "Buffer_time" => '');
				$arr = array_merge_recursive($arr, $row1);
				echo json_encode($arr);
			}
		} else {
			$arr = array("Buffer_id" => '', "Buffer_time" => '');
			$arr = array_merge_recursive($arr, $row1);
			echo json_encode($arr);
		}

	} else {
		$arr = array("Buffer_id" => '', "Buffer_time" => '');
		$arr = array_merge_recursive($arr, $row1);
		echo json_encode($arr);
	}
} else {
	$response['statue'] = -1;
	echo json_encode($response);
	exit ;
}
?>