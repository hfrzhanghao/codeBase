<?php
/*更新新闻*/
header("Content-type:application/json; charset=utf-8");
require_once('db.php');

if($link){
	$updateid = $_POST['updateId'];
	$newstitle = $_POST['unewstitle'];
	$newstype = $_POST['unewstype'];
	$newsimg = $_POST['unewsimg'];
	$newssrc = $_POST['unewssrc'];
	$newstime = $_POST['unewstime'];

	$sql = "UPDATE `baidunews` SET `newstitle`='{$newstitle}',`newstype`='{$newstype}',`newsimg`='{$newsimg}',`newstime`='{$newstime}',`newssrc`='{$newssrc}' WHERE `id` = '{$updateid}'"  ;

	mysqli_query($link,"SET NAMES 'UTF8'");
	$result = mysqli_query($link,$sql);

	echo json_encode(array('success' => 'ok'));
} 

mysqli_close($link);
?>