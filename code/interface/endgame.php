<?php
/*退出房间
 *
 * */
include '../mysqli/opDB.class.php';
$con = new opDB();
$response = array("statue"=>'');
if (isset($_POST['name']) && $_POST['name'] && $_POST['gamestatue'] && isset($_POST['gamestatue'])) {
	$roomid = addslashes($_POST['name']);
	$gamestatue = addslashes($_POST['gamestatue']);
    if($gamestatue==-1){
    	$sql = "DELETE FROM audio WHERE roomid='{$roomid}'";
		$con->excute_dml($sql);
    }else{
    	
    }
} else {
	$response['statue'] = -1;
	echo json_encode($response);
	exit;
}
?>