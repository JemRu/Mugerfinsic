<?php
class opDB {
	private $mysqli;
	private $host = "localhost";
	private $root = "zhaoshuai";
	private $password = "";
	private $db = "music";

	function __construct() {
	//	$this -> mysqli = new mysqli($this -> host, $this -> root, $this -> password, $this -> db);
        $this -> mysqli = new mysqli(SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_DB,SAE_MYSQL_PORT);
		if (!$this -> mysqli) {
			die("connect error！" . $this -> mysqli -> connect_error);
		}
		$this -> mysqli -> query("set names 'utf8'");
		$this -> mysqli -> query("set charset set 'utf8'");
	}

	//查询操作
	public function excute_dql($sql) {
		$res = $this -> mysqli -> query($sql) or die($this -> mysqli -> error);
		if ($row = mysqli_fetch_row($res)) {
			return 0;
		} else {
			return 1;
		}
	}

	//增删改操作
	public function excute_dml($sql) {
		$res = $this -> mysqli -> query($sql) or die($this -> mysqli -> error);
		if (!$res) {
			return mysqli_error($res);
		} else {
			if ($this -> mysqli -> affected_rows == 0) {
				return 1;				
			} else {
				return 0;
			}
		}
	}
	
	//为了 获取多个结果
	public function get_result($sql) {
		$res = $this -> mysqli -> query($sql) or die($this -> mysqli -> error);
		if ($res) {
			return $res;
		} else {
			return 1;
		}

	}
	

	//关闭自动提交
	function auto_commit() {
		$this -> mysqli -> autocommit(FALSE);
	}

	//确认提交
	function my_commit() {
		$this -> mysqli -> commit();
	}
	//回滚 
	function my_rollback() {
		$this-> mysqli-> rollback();
	}
	//获得最新的id
	function get_id() {
		return $this -> mysqli -> insert_id;
	}

	function for_close() {
		$this -> mysqli -> close();
	}

}
?>