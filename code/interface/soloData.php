<?php
include '../mysqli/opDB.class.php';
$con = new opDB();
if(isset($_POST['num'])&&$_POST['num']&&isset($_POST['name'])&&$_POST['name']){
	$response = array("statue"=>'');	
	$number = $_POST['num'];
	$roomid = $_POST['name'];
    $sql = "select Buffer_id,Buffer_time from audio where roomid='{$roomid}'";
	$res = $con->get_result($sql);
	$jason = array();
	$i = 0;
	while ($row = mysqli_fetch_assoc($res)) {
	    if($i>$number){
			array_push($jason, $row);
		}
		$i++;
	}
	if(!empty($jason)){
		echo json_encode($jason);
		exit;
	}else{
		$response['statue'] = -2;
		echo json_encode($response);
		exit;
	}
}else{
	$response['statue'] = -1;
	echo json_encode($response);
	exit;
}

?>