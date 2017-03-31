<?php
/*删除新闻*/
header("Content-type:application/json; charset=utf-8");
require_once('db.php');

if($link){
	$newsid = $_POST['newsid'];
	mysqli_query($link,"SET NAMES 'UTF8'");
	//$sql = "DELETE FROM `baidunews` WHERE `baidunews`.`id` = {$newsid}";
	$sql = "UPDATE `baidunews` SET `isDelete` = 1 WHERE `baidunews`.`id` = {$newsid}";
	
	mysqli_query($link,$sql);

	echo json_encode(array('success' => 'ok'));

}



mysqli_close($link);
?>