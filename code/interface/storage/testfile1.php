
<?php
require_once('saestorage.class.php');
#your app accesskey
$ak = '32woy14lz4';
#your app secretkey
$sk = '0kkx2hy3y5z3miyj1310wwmmx12iwlz0ikhkkkk3';
#your domain name
$domain = 'music';
$destFileName = 'zhaoshuai.txt';
$content = "2";
$attr = array('encoding'=>'gzip');
$storage = new SaeStorage($ak, $sk);
//$storage->write($domain,$destFileName, $content, -1, $attr, false);
$result = $storage->write($domain,$destFileName, $content, -1, $attr, false);
var_dump($result);
?>
