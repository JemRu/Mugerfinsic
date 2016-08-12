<?php
/*退出房间
 *
 * */
include '../mysqli/opDB.class.php';
$con = new opDB();
$response = array("statue"=>'');
if (isset($_POST['name']) && $_POST['name'] && $_POST['roomid'] && isset($_POST['roomid'] && isset($_POST['position']) && $_POST['position']
    && isset($_POST['gamestatue'])) && $_POST['gamestatue']) && isset($_POST['palystatue']) && $_POST['palystatue'] ) {
	$name = addslashes($_POST['name']);
	$roomid = addslashes($_POST['roomid']);
	$gamestatue = $_POST['gamestatue']);	
	$position = $_POST['position'];
	if($position==1 && $gamestatue==4){
		$sql = "select play01,play02,play03,play04 from rooms where roomid='{$roomid}'";
		$res = $con -> get_result($sql);
		if ($row = mysqli_fetch_assoc($res)) {
			if ($row['play01'] == $name) {
				$sql = "UPDATE rooms SET play01='-1',statue01=1,play02='-1',statue02=1,
				play03='-1',statue03=1,play04='-1',statue04=1,gamestatue='{$gamestatue}',num=1,ins01='',ins02='',ins03='',ins04='' where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			} /*elseif ($row['play02'] == $name) {
				$sql = "UPDATE rooms SET play02='-1',statue02=1,gamestatue='{$gamestatue}' where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			} elseif ($row['play03'] == $name) {
				$sql = "UPDATE rooms SET play03='-1',statue03=1,gamestatue='{$gamestatue}' where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			} elseif ($row['play04'] == $name) {
				$sql = "UPDATE rooms SET play04='-1',statue04=1,gamestatue='{$gamestatue}' where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			}*/
			
			$sql = "DELETE FROM room$roomid";
			$con -> excute_dml($sql);
		} else {
			$response['statue'] = -2;
			echo json_encode($response);
			exit ;
		}
	}elseif($position==1 && $gamestatue==3){
		$sql = "select play01,play02,play03,play04 from rooms where roomid='{$roomid}'";
		$res = $con -> get_result($sql);
		if ($row = mysqli_fetch_assoc($res)) {
			if ($row['play01'] == $name) {
				$sql = "UPDATE rooms SET gamestatue='{$gamestatue}' where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			} /*elseif ($row['play02'] == $name) {
				$sql = "UPDATE rooms SET play02='-1',statue02=1,gamestatue='{$gamestatue}' where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			} elseif ($row['play03'] == $name) {
				$sql = "UPDATE rooms SET play03='-1',statue03=1,gamestatue='{$gamestatue}' where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			} elseif ($row['play04'] == $name) {
				$sql = "UPDATE rooms SET play04='-1',statue04=1,gamestatue='{$gamestatue}' where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			}*/
			if ($row['play01'] == -1 && $row['play02'] == -1 && $row['play03'] == -1 && $row['play04'] == -1) {
				$sql = "DELETE FROM room$roomid";
				$sql1 = "UPDATE rooms SET play01='-1',statue01=1,ins01='',ins02='',ins03='',ins04='',play02='-1',statue02=1,
						play03='-1',statue03=1,play04='-1',statue04=1,gamestatue='2',bgmstatue='2',bgmname='',num=1 where roomid='{$roomid}'";
				$con -> excute_dml($sql);
				$con->excute_dml($sql);
			}
		} else {
			$response['statue'] = -2;
			echo json_encode($response);
			exit ;
		}
	}else{
		$sql = "select play01,play02,play03,play04 from rooms where roomid='{$roomid}'";
		$res = $con -> get_result($sql);
		if ($row = mysqli_fetch_assoc($res)) {
			if ($row['play01'] == $name) {
				$sql = "UPDATE rooms SET play01='-1',statue01=1,ins01='',num=num-1 where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			} elseif ($row['play02'] == $name) {
				$sql = "UPDATE rooms SET play02='-1',statue02=1,ins02='',num=num-1 where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			} elseif ($row['play03'] == $name) {
				$sql = "UPDATE rooms SET play03='-1',statue03=1,ins03='',num=num-1 where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			} elseif ($row['play04'] == $name) {
				$sql = "UPDATE rooms SET play04='-1',statue04=1,ins04='',num=num-1 where roomid='{$roomid}'";
				$con -> excute_dml($sql);
			}
			if ($row['play01'] == -1 && $row['play02'] == -1 && $row['play03'] == -1 && $row['play04'] == -1) {
				$sql = "DELETE FROM room$roomid";
				$sql1 = "UPDATE rooms SET play01='-1',statue01=1,ins01='',ins02='',ins03='',ins04='',play02='-1',statue02=1,
						play03='-1',statue03=1,play04='-1',statue04=1,gamestatue='2',bgmstatue='2',bgmname='',num=1 where roomid='{$roomid}'";
				$con -> excute_dml($sql);
				$con->excute_dml($sql);
			}
		} else {
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