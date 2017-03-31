<?php
/*添加新闻*/
header("Content-type:application/json; charset=utf-8");
require_once('db.php');

if($link){
	$newstitle = $_POST['newstitle'];
	$newstype = $_POST['newstype'];
	$newsimg = $_POST['newsimg'];
	$newssrc = $_POST['newssrc'];
	$newstime = $_POST['newstime'];

	$sql = "INSERT INTO `baidunews` (`newstitle`,`newstype`,`newsimg`,`newstime`,`newssrc`,`isDelete`) VALUES  ('{$newstitle}','{$newstype}','{$newsimg}','{$newstime}','{$newssrc}',0)";

	mysqli_query($link,"SET NAMES 'UTF8'");
	$result = mysqli_query($link,$sql);

	echo json_encode(array('success' => 'ok'));
} 

mysqli_close($link);
?>