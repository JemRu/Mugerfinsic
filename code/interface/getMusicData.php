<?php
/*H获取音乐列表
 * 
 * */
include '../mysqli/opDB.class.php';
$con = new opDB();
$response = array("statue" => '');
$json = array();
$sql = "SELECT musicname FROM savemusic limit 20";
$result = $con->get_result($sql);

while($row = mysqli_fetch_assoc($result)){
	array_push($json,$row);
}
if(!empty($json)){
	echo json_encode($json);
	exit;
}else{
	$response['statue'] = -1;
	echo json_encode($response);
	exit ;
}


?>