<?php
/*分享    
 * 
 * */
include '../mysqli/opDB.class.php';
require_once('./storage/saestorage.class.php');
$con = new opDB();
$response = array("savestatue"=>'');
if (isset($_POST['name']) && $_POST['name'] && $_POST['roomid'] && isset($_POST['roomid']) && isset($_POST['musicname']) && $_POST['musicname']
    && isset($_POST['type']) && $_POST['type'] && isset($_POST['bgmname']) && $_POST['bgmname'] )  {
    $name = addslashes($_POST['name']);
	$roomid = addslashes($_POST['roomid']);
	$type = $_POST['type'];
	$musicname = addslashes($_POST['musicname']);		
	$bgmname = addslashes($_POST['bgmname']);
	if($type == 1){
		if($roomid==-1){
			$sql = "SELECT Buffer_id,Buffer_time FROM audio as a 
			WHERE roomid='{$name}'";
			$res = $con->get_result($sql);
			$jason = array();
			$bgm = array("bgmname"=>$bgmname);
			while ($row = mysqli_fetch_assoc($res)) {
				$row = array_merge_recursive($row,$bgm);
				array_push($jason, $row);
			}
			$jason = json_encode($jason);
			if(!empty($jason)){
				/*
				 * 保存 音乐
				 * */
				 #your app accesskey
				$ak = '32woy14lz4';
				#your app secretkey
				$sk = '0kkx2hy3y5z3miyj1310wwmmx12iwlz0ikhkkkk3';
				#your domain name
				$domain = 'music';
				$destFileName = $musicname.'.txt';
				$content = $jason;
				$attr = array('encoding'=>'gzip');
				$storage = new SaeStorage($ak, $sk);
				$result = $storage->write($domain,$destFileName, $content, -1, $attr, false);
				 
				/*$PATH = "../resources/".$musicname.".txt";
				$myfile = fopen($PATH, 'x+') or die("Unable to open file!");
				fwrite($myfile, $jason);
				fclose($myfile);*/
				
				/*
				 * 改变 音乐列表状态
				 * */
				$destFileName = 'zhaoshuai.txt';
				$content = 2;
				$storage1 = new SaeStorage($ak, $sk);
				$storage1->write($domain,$destFileName, $content, -1, $attr, false);
				
				/*$PATH = "../resources/zhaoshuai.txt";
				$myfile1 = fopen($PATH, 'w+') or die("Unable to open file!");
				fwrite($myfile1,2);	
				fclose($myfile1);*/
				/**删除数据
				 * 
				 * 
				 */
				$sql = "DELETE FROM audio WHERE roomid='{$name}'";
				$sql1 = "INSERT INTO savemusic VALUES ('{$musicname}',now())";
				if($con->excute_dml($sql)==0 && $con->excute_dml($sql1)==0 ){
					$response['savestatue'] = 0;
					echo json_encode($response);
					exit ;
				}
			}
		}else{
			/*
			 * 保存 音乐
			 * */
			$sql = "SELECT * FROM room$roomid";
			$res = $con->get_result($sql);
			$jason = array();
			$bgm = array("bgmname"=>$bgmname);
			while ($row = mysqli_fetch_assoc($res)) {
				$row = array_merge_recursive($row,$bgm);
				array_push($jason, $row);
			}
			$jason = json_encode($jason);
			if(!empty($jason)){
				/*
				 * 保存 音乐
				 * */
				 #your app accesskey
				$ak = '32woy14lz4';
				#your app secretkey
				$sk = '0kkx2hy3y5z3miyj1310wwmmx12iwlz0ikhkkkk3';
				#your domain name
				$domain = 'music';
				$destFileName = $musicname.'.txt';
				$content = $jason;
				$attr = array('encoding'=>'gzip');
				$storage = new SaeStorage($ak, $sk);
				$result = $storage->write($domain,$destFileName, $content, -1, $attr, false);
				 
				/*$PATH = "../resources/".$musicname.".txt";
				$myfile = fopen($PATH, 'x+') or die("Unable to open file!");
				fwrite($myfile, $jason);
				fclose($myfile);*/
				
				/*
				 * 改变 音乐列表状态
				 * */
				$destFileName = 'zhaoshuai.txt';
				$content = 2;
				$storage1 = new SaeStorage($ak, $sk);
				$storage1->write($domain,$destFileName, $content, -1, $attr, false);
				
				/*$PATH = "../resources/zhaoshuai.txt";
				$myfile1 = fopen($PATH, 'w+') or die("Unable to open file!");
				fwrite($myfile1,2);	
				fclose($myfile1);*/
				
				/*s
				 * 删除数据
				 * */
				$sql = "DELETE FROM room$roomid";
				$sql1 = "UPDATE rooms SET play01='-1',statue01=1,ins01='',ins02='',ins03='',ins04='',play02='-1',statue02=1,
		play03='-1',statue03=1,play04='-1',statue04=1,gamestatue='2',bgmstatue='2',bgmname='',num=1 where roomid='{$roomid}'";
				$sql2 = "INSERT INTO savemusic VALUES ('{$musicname}',now())";
				if($con->excute_dml($sql)==0 && $con->excute_dml($sql1)==0 && $con->excute_dml($sql2)==0){
					$response['savestatue'] = 0;
					echo json_encode($response);
					exit ;
				}else{
					/*服务器问题
					 * */
					$response['savestatue'] = -2;
					echo json_encode($response);
					exit ;
				}
			}
		}	
	}elseif($type == 2){
		if($roomid==-1){
			$sql = "DELETE FROM audio WHERE roomid='{$name}'";
			if($con->excute_dml($sql)==0){
				$response['savestatue'] = 0;
				echo json_encode($response);
				exit ;
			}else{
				/*服务器问题
				 * */
				$response['savestatue'] = -2;
				echo json_encode($response);
				exit ;
			}
		}else{
			$sql = "DELETE FROM room$roomid";
			$sql1 = "UPDATE rooms SET play01='-1',statue01=1,ins01='',ins02='',ins03='',ins04='',play02='-1',statue02=1,
			play03='-1',statue03=1,play04='-1',statue04=1,gamestatue='2',bgmstatue='2',bgmname='',num=1 where roomid='{$roomid}'";
			if($con->excute_dml($sql)==0 && $con->excute_dml($sql1)==0){
				$response['savestatue'] = 0;
				echo json_encode($response);
				exit ;
			}else{
				/*服务器问题
				 * */
				$response['savestatue'] = -2;
				echo json_encode($response);
				exit ;
			}
		}	
	}
}else{
	$response['savestatue'] = -1;
	echo json_encode($response);
	exit ;
}

?>