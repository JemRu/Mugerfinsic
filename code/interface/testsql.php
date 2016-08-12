<?php
include '../mysqli/opDB.class.php';
$roomid = 3;
$con = new opDB();	
/*$sql = "select * from rooms as r full JOIN room$roomid as a where r.roomid=a.roomid";
$res = $con->get_result($sql);
$aa = array();
while($row = mysqli_fetch_assoc($res)){
	array_push($aa,$row);
	
}*/
//echo json_encode($aa);
$sql = "UPDATE rooms SET play01='-1',statue01=1,ins01='',ins02='',ins03='',ins04='',play02='-1',statue02=1,
		play03='-1',statue03=1,play04='-1',statue04=1,gamestatue='2',bgmstatue='2',bgmname='',num=1";
$con->excute_dml($sql);
/*date_default_timezone_set("Asia/Shanghai");
$destFileName = date('Ymdhmi').$roomid.'music.txt';	
echo $destFileName;*/
?>