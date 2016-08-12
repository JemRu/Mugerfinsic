<?php
/*创建房间
 * 
 * */	
include '../mysqli/opDB.class.php';
$mysqli = new opDB();
$response = array("statue"=>'');
$sql = "select roomid from rooms where num=1 limit 1";
$res = $mysqli->get_result($sql);
if ($row = mysqli_fetch_assoc($res)) {
	echo json_encode($row);
	$mysqli->for_close();
	exit;
} else {
	$response['statue'] = -1;
	echo json_encode($response);
	exit;
}

?>