<?php
include '../mysqli/opDB.class.php';
$con = new opDB();
$response = array("statue"=>'');
if($_POST['data1'] && isset($_POST['data1']) && isset($_POST['roomid']) && $_POST['roomid']){
    $roomid = $_POST['roomid'];
    $json = $_POST['data1'];
	$Buffer_id = $json['Buffer_id'];
	$Buffer_time = $json['Buffer_time'];
    if($con->excute_dml("insert into room$roomid(Buffer_id,Buffer_time) values( '{$Buffer_id}','{$Buffer_time}')")==0){
        $response['statue'] = 0;
		echo json_encode($response);
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